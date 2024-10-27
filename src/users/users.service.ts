import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { Response } from "express";
import { MailService } from "../mail/mail.service";
import { SignInUserDto } from "./dto/signin-user.dto";
import { PhoneUserDto } from "./dto/phone-user.dto";

import * as otpGenerator from "otp-generator";
import { BotService } from "../bot/bot.service";
import { Otp } from "../otp/models/otp.model";
import { AddMinutesToDate } from "../helpers/addMinutes";
import { decode, encode } from "../helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { SmsService } from "../sms/sms.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Otp) private otpModel: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly botService: BotService,
    private readonly smsService: SmsService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });
    const tokens = await this.generateTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    const activation_link = uuid.v4();

    const updatedUser = await this.userModel.update(
      {
        hashed_refresh_token,
        activation_link,
      },
      {
        where: { id: newUser.id },
        returning: true,
      }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
    });

    try {
      await this.mailService.sendMail(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Xat yuborishda xatoik!");
    }

    const response = {
      message: "User registered successfully!",
      user: updatedUser[1][0],
      access_token: tokens.access_token,
    };
    return response;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updateUser[1][0]) {
      throw new BadRequestException("User already activated");
    }

    const response = {
      message: "User activated successfully!",
      user: updateUser[1][0].is_active,
    };
    return response;
  }

  async signIn(signInUserDto: SignInUserDto, res: Response) {
    const { email, password } = signInUserDto;
    const user = await this.userModel.findOne({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException("User not found!");
    }

    if (!user.is_active) {
      throw new BadRequestException("User is not active!");
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException("Email or password incorrect!");
    }

    const tokens = await this.generateTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    const updatedUser = await this.userModel.update(
      { hashed_refresh_token },
      { where: { id: user.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: "User sign in successfully!",
      user: updatedUser[1][0],
      access_token: tokens.access_token,
    };

    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new BadRequestException("User is not verified");
    }

    const updateUser = await this.userModel.update(
      { hashed_refresh_token: null },
      { where: { id: userData.id }, returning: true }
    );

    res.clearCookie("refresh_token");

    const response = {
      message: "User sign out successfully!",
    };

    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);

      if (userId !== decodedToken["id"]) {
        throw new BadRequestException("Ruhsat etilmagan foydalanuvchi");
      }

      const user = await this.userModel.findOne({ where: { id: userId } });

      if (!user || !user.hashed_refresh_token) {
        throw new BadRequestException(
          "Foydalanuvchi topilmadi yoki refresh token noto'g'ri"
        );
      }

      const tokenMatch = await bcrypt.compare(
        refreshToken,
        user.hashed_refresh_token
      );

      if (!tokenMatch) {
        throw new BadRequestException("Forbidden");
      }

      const tokens = await this.generateTokens(user);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

      const updatedUser = await this.userModel.update(
        { hashed_refresh_token },
        { where: { id: user.id }, returning: true }
      );

      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const response = {
        message: "User refreshed successfully!",
        user: updatedUser[1][0],
        access_token: tokens.access_token,
      };

      return response;
    } catch (error) {
      throw new BadRequestException(
        "Refresh token yaroqsiz yoki amal qilish muddati tugagan"
      );
    }
  }

  // ==========================================

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // BOT
    const isSend = await this.botService.sendOtp(phone_number, otp);

    if (!isSend) {
      throw new BadRequestException("Avval ro'yhatdan o'tinng");
    }

    // SMS
    const response = await this.smsService.sendSMS(phone_number, otp);

    if (response.status !== 200) {
      throw new ServiceUnavailableException("OTP yuborishda xatolik!");
    }

    const message =
      `OTP code has been send to ****` +
      phone_number.slice(phone_number.length - 4);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });

    const newOtp = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      expiration_time,
      phone_number,
    });
    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtp.id,
    };
    const encodedData = await encode(JSON.stringify(details));

    return { message, details: encodedData };
  }

  async veifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, phone_number } = verifyOtpDto;
    const currentDate = new Date();
    const decodedData = await decode(verification_key);
    const deatails = JSON.parse(decodedData);
    if (deatails.phone_number !== phone_number) {
      throw new BadRequestException("OTP bu raqamga yuborilmagan");
    }
    const resultOtp = await this.otpModel.findOne({
      where: { id: deatails.otp_id },
    });
    if (!resultOtp) {
      throw new BadRequestException("Bunday otp mavjud emas");
    }
    if (resultOtp.verified) {
      throw new BadRequestException("Bu OTP avval tekshirilgan");
    }
    if (resultOtp.expiration_time < currentDate) {
      throw new BadRequestException("Bu OTP avval vaqti tugagan");
    }
    if (resultOtp.otp !== otp) {
      throw new BadRequestException("OTP mos emas");
    }
    const user = await this.userModel.update(
      {
        is_owner: true,
      },
      { where: { phone: phone_number }, returning: true }
    );
    if (!user[1][0]) {
      throw new BadRequestException("Bunday foydalanuvchi yoq");
    }
    await this.otpModel.update(
      {
        verified: true,
      },
      { where: { id: deatails.otp_id } }
    );

    const responser = {
      message: "Siz owner bo'ldingiz",
      owner: user[1][0].is_owner,
    };

    return responser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return user[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}
