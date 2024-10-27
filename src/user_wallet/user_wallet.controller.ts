import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWallet } from './models/user_wallet.model';

@ApiTags("User Wallet (User elektron hamyoni)")
@Controller("user-wallet")
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @ApiOperation({ summary: "Yangi User Wallet qo'shish" })
  @ApiResponse({
    status: 201,
    description: "User Wallet qoshish",
    type: UserWallet,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createUserWalletDto: CreateUserWalletDto
  ): Promise<UserWallet> {
    return this.userWalletService.create(createUserWalletDto);
  }

  @ApiOperation({ summary: "User Walletlar chiqarish" })
  @ApiResponse({
    status: 200,
    description: "User Wattets",
    type: [UserWallet],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<UserWallet[]> {
    return this.userWalletService.findAll();
  }

  @ApiOperation({ summary: "User Wallet id orqali topish" })
  @ApiResponse({
    status: 200,
    description: "User Wallet Id orqali topish",
    type: UserWallet,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<UserWallet> {
    return this.userWalletService.findOne(id);
  }

  @ApiOperation({ summary: "User Wallet id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "User Wallet Id orqali yangilash",
    type: UserWallet,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateUserWalletDto: UpdateUserWalletDto
  ): Promise<UserWallet> {
    return this.userWalletService.update(id, updateUserWalletDto);
  }

  @ApiOperation({ summary: "User Wallet id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "User Wallet Id orqali o'chirish",
    type: UserWallet,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<number> {
    return this.userWalletService.remove(id);
  }
}
