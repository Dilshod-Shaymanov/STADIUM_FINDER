import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IUserWalletCreationAttr {
  userId: number;
  wallet: number;
}

@Table({ tableName: "user_wallet", timestamps: false })
export class UserWallet extends Model<UserWallet, IUserWalletCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User wallet uniq ID (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "User uniq ID (ForieginKey)",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: 100000,
    description: "User electron Wallet (Electron hamyon)",
  })
  @Column({
    type: DataType.DECIMAL,
  })
  wallet: number;

  @BelongsTo(() => User)
  user: User;
}
