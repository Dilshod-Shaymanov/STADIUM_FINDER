import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserCard } from '../../user_card/models/user_card.model';
import { UserWallet } from '../../user_wallet/models/user_wallet.model';
import { Stadium } from '../../stadium/models/stadium.model';
import { Comment } from '../../comment/models/comment.model';

interface IUserCreationAttr {
  full_name: string;
  email: string;
  phone: string;
  tg_link: string;
  hashed_password: string;
  photo: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User uniq ID (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: "Sardor",
    description: "User Full Name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({
    example: "sardor@gmail.com",
    description: "User email",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

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
    example: "@sardoe_22",
    description: "User tg_k=link",
  })
  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @ApiProperty({
    example: "$aRdoR11",
    description: "User password",
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: "photo.jpg",
    description: "User photo",
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: false,
    description: "User is active",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "User is owner",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => UserCard)
  user_cards: UserCard[];

  @HasMany(() => UserWallet)
  user_wallets: UserWallet[];

  @HasMany(() => Stadium)
  stadiums: Stadium[];

  @HasMany(() => Comment)
  comments: Comment[];
}
