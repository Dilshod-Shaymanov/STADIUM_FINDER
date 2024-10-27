import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
import { Status } from "../../status/models/status.model";

interface ICartCreationAttr {
  userId: number;
  userWalletId: number;
  stTimesId?: number;
  date: Date;
  createdAt: Date;
  time_for_clear: Date;
  statusId: number;
}

@Table({ tableName: "cart" })
export class Cart extends Model<Cart, ICartCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Cart uniq ID (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "User ID (foriegnKey)",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: "User Wallet ID (foriegnKey)",
  })
  @ForeignKey(() => UserWallet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userWalletId: number;

  @ApiProperty({
    example: 1,
    description: "Parent User Wallet ID (foriegnKey)",
  })
  @ForeignKey(() => UserWallet)
  @Column({
    type: DataType.INTEGER,
  })
  stTimesId?: number;

  @ApiProperty({
    example: 1,
    description: "2024-10-22",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @ApiProperty({
    example: 1,
    description: "2024-10-22",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @ApiProperty({
    example: 1,
    description: "2024-10-22",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  time_for_clear: Date;

  @ApiProperty({
    example: 1,
    description: "Status ID (foriegnKey)",
  })
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => UserWallet)
  user_wallet: UserWallet;

  @BelongsTo(() => UserWallet)
  stadium_times: UserWallet;

  @BelongsTo(() => Status)
  status: Status;
}
