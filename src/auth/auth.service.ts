import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../admin/admin.service";
import { Admin } from "../admin/models/admin.model";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { SignInAdminDto } from "./dto/signin-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  // Generate Token
  async generateTokensWithAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      login: admin.login,
      is_active: admin.is_active,
      is_owner: admin.is_creator,
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

  // Sign Up Admin
  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByLogin(
      createAdminDto.login
    );

    if (admin) {
      throw new BadRequestException("Bunday Admin mavjud!");
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 10);
    const newAdmin = await this.adminService.create({
      ...createAdminDto,
      password: hashed_password,
    });

    const tokens = await this.generateTokensWithAdmin(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    const updatedAdmin = await this.adminService.update(newAdmin.id, {
      hashed_refresh_token,
    });

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
    });

    const response = {
      message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!",
      admin: updatedAdmin,
      access_token: tokens.access_token,
    };
    return response;
  }

  // Sign In Admin
  async signInAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByLogin(
      signInAdminDto.login
    );

    if (!admin) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(
      signInAdminDto.password,
      admin.hashed_password
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    if (!admin.is_active) {
      throw new BadRequestException("Akkount hali faollashtirilmagan");
    }

    const tokens = await this.generateTokensWithAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    await this.adminService.update(admin.id, { hashed_refresh_token });

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
    });

    const response = {
      message: "Tizimga muvaffaqiyatli kirildi",
      admin: {
        id: admin.id,
        login: admin.login,
        name: admin.name,
        is_active: admin.is_active,
      },
      access_token: tokens.access_token,
    };

    return response;
  }

  // Sign Out Admin
  async signOut(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminService.findOne(payload.id);
    if (!admin) {
      throw new BadRequestException("Admin topilmadi");
    }

    await this.adminService.update(admin.id, { hashed_refresh_token: null });

    res.clearCookie("refresh_token");

    return {
      message: "Tizimdan muvaffaqiyatli chiqildi",
    };
  }

  // Refresh Token Admin
  async refreshToken(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin || !admin.hashed_refresh_token) {
        throw new BadRequestException(
          "Admin topilmadi yoki refresh token noto'g'ri"
        );
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token
      );
      if (!isRefreshTokenValid) {
        throw new BadRequestException("Refresh token noto'g'ri");
      }

      const tokens = await this.generateTokensWithAdmin(admin);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

      await this.adminService.update(admin.id, { hashed_refresh_token });

      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        maxAge: Number(process.env.REFRESH_TIME_MS),
      });

      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException(
        "Refresh token yaroqsiz yoki amal qilish muddati tugagan"
      );
    }
  }
}
