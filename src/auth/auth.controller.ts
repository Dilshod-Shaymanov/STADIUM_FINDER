import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SignInAdminDto } from "./dto/signin-admin.dto";
import { Request, Response } from "express";
import { CreatorGuard } from "../guards/creator.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@ApiTags("Authorization (Ro'yhatdan o'tish)")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Yangi Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin qoshish",
    type: "string",
  })
  @UseGuards(CreatorGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signUpAdmin(createAdminDto, res);
  }

  @ApiOperation({ summary: "Adminni tizimga kiritish (signIn)" })
  @ApiResponse({
    status: 200,
    description: "Tizimga kirish muvaffaqiyatli",
    type: "string",
  })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInAdminDto, res);
  }

  @ApiOperation({ summary: "Adminni tizimdan chiqarish (signOut)" })
  @ApiResponse({
    status: 200,
    description: "Admin tizimdan muvaffaqiyatli chiqarildi",
  })
  @HttpCode(HttpStatus.OK)
  @Post("signout")
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies["refresh_token"];
    return this.authService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: "Yangi access token olish (refreshToken)" })
  @ApiResponse({
    status: 200,
    description: "Yangi access token berildi",
  })
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies["refresh_token"];
    return this.authService.refreshToken(refreshToken, res);
  }
}
