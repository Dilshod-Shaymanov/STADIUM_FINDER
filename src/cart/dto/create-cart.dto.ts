import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/models/user.model";
import { Column, DataType, ForeignKey } from "sequelize-typescript";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
import { IsDateString, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Status } from "../../status/models/status.model";

export class CreateCartDto {
  @ApiProperty({
    example: 1,
    description: "User Id (foriegnKey)",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: "User Wallet Id (foriegnKey)",
  })
  @ForeignKey(() => UserWallet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userWalletId: number;

  @ApiProperty({
    example: 1,
    description: "Parent event type type ID",
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stTimesId?: number;

  @ApiProperty({
    example: "2024-10-01",
    description: "Cart date",
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: "2024-10-01",
    description: "Creates At date",
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: "2024-10-01",
    description: "Time for clear date",
  })
  @IsDateString()
  time_for_clear: Date;

  @ApiProperty({
    example: 1,
    description: "Status Id (foriegnKey)",
  })
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId: number;
}
