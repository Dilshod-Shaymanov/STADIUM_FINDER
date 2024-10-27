import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { Response, Request } from "express";
import { UserGuard } from "../guards/user.guard";
import { CookieGetter } from "../decorators/cookie_getter.decorator";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@ApiTags("Users (Foydalanuvchilar)")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Yangi User qo'shish" })
  @ApiResponse({
    status: 201,
    description: "User qoshish",
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signUp(createUserDto, res);
  }

  // ======================================

  @HttpCode(HttpStatus.OK)
  @Post("newotp")
  async newOtp(
    @Body() phoneUserDto: PhoneUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("verify")
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.veifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: "Userni faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Userni faollashtirish",
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Get("activate/:link")
  async activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }

  @ApiOperation({ summary: "Userni tizimga kiritish (signIn)" })
  @ApiResponse({
    status: 200,
    description: "Tizimga kirish muvaffaqiyatli",
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signIn(signInUserDto, res);
  }

  @ApiOperation({ summary: "Userni tizimdan chiqarish (signOut)" })
  @ApiResponse({
    status: 200,
    description: "User tizimdan muvaffaqiyatli chiqarildi",
  })
  @HttpCode(HttpStatus.OK)
  @Post("signout")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: "Yangi access token olish (refreshToken)" })
  @ApiResponse({
    status: 200,
    description: "Yangi access token berildi",
  })
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refreshToken(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: "Userlarni chiqarish" })
  @ApiResponse({
    status: 200,
    description: "User nomlari",
    type: [User],
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "User nomini id orqli topish" })
  @ApiResponse({
    status: 200,
    description: "User nomini Id orqali topish",
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "User nomini Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "User Id orqali yangilash",
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "User nomini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "User Id orqali ochirish",
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.usersService.remove(id);
  }
}
