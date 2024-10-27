import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber } from "class-validator";

export class CreateUserWalletDto {
  @ApiProperty({
    example: 1,
    description: "User ID (ForiegnKey)",
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 10000,
    description: "User Wallet (Elektron hamyon)",
  })
//   @IsDecimal()
  @IsNumber()
  wallet: number;
}
