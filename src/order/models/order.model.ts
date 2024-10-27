import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { StadiumTime } from "../../stadium_time/models/stadium_time.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
import { ApiProperty } from "@nestjs/swagger";

interface IOrderCreationAttr {
  userId: number;
  userWalletId: number;
  stadiumTimeId: number;
  description: string;
  status: string;
  date: Date;
}

@Table({ tableName: "order", timestamps: true })
export class Order extends Model<Order, IOrderCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Order unikal ID raqami (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "User unikal ID raqami (ForeignKey)",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: "User Wallet ID raqami (ForeignKey)",
  })
  @ForeignKey(() => UserWallet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userWalletId: number;

  @ApiProperty({
    example: 1,
    description: "Stadium Time ID raqami (ForeignKey)",
  })
  @ForeignKey(() => StadiumTime)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumTimeId: number;

  @ApiProperty({
    example: "Extra services requested",
    description: "Buyurtma tavsifi",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: "paid",
    description: "Buyurtma statusi (paid yoki unpaid)",
  })
  @Column({
    type: DataType.ENUM("paid", "unpaid"),
    defaultValue: "unpaid",
  })
  status: string;

  @ApiProperty({
    example: "2024-10-01",
    description: "Buyurtma sanasi",
  })
  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  date: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => UserWallet)
  userWallet: UserWallet;

  @BelongsTo(() => StadiumTime)
  stadiumTime: StadiumTime;
}
