import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IUserCardCreationAttr {
  userId: number;
  name: string;
  phone: string;
  number: string;
  year: number;
  month: number;
  is_active: boolean;
  is_main: boolean;
}

@Table({ tableName: "user_card", timestamps: false })
export class UserCard extends Model<UserCard, IUserCardCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User card uniq ID (autoIncrement)",
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
    example: "Humo Card",
    description: "User Card Name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "+998944454545",
    description: "User phone number",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  phone: string;

  @ApiProperty({
    example: "9860 0908 9898 6655",
    description: "User Card number",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  number: string;

  @ApiProperty({
    example: 2024,
    description: "User card year",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @ApiProperty({
    example: 11,
    description: "User card month",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  month: number;

  @ApiProperty({
    example: false,
    description: "User card is activate",
  })
  @Column({
    type: DataType.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    // allowNull: false,
    defaultValue: false,
  })
  is_main: boolean;

  @BelongsTo(() => User)
  user: User;
}
