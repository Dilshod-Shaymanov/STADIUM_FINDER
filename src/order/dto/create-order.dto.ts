import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
  IsDateString,
} from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: "User unique Id (ForeignKey)",
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 1,
    description: "User Wallet unique Id (ForeignKey)",
  })
  @IsNumber()
  userWalletId: number;

  @ApiProperty({
    example: 1,
    description: "Stadium Time unique Id (ForeignKey)",
  })
  @IsNumber()
  stadiumTimeId: number;

  @ApiProperty({
    example: "Extra services requested",
    description: "Description of the order",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "paid",
    description: "Order status, can be 'paid' or 'unpaid'",
  })
  @IsEnum(["paid", "unpaid"], {
    message: 'Status must be either "paid" or "unpaid"',
  })
  status: string;

  @ApiProperty({
    example: "2024-10-01",
    description: "Order date",
  })
  @IsDateString()
  date: Date;
}
