import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  name: string;
  login: string;
  tg_link: string;
  photo: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token?: string;
}

@Table({ tableName: "admin", timestamps: false }) // `timestamps: false` saqlab qoldik
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Admin uniq ID (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: "Sardor",
    description: "Admin Name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "sardor11",
    description: "Admin login",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @ApiProperty({
    example: "@sardor_tg",
    description: "Admin telegram link",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tg_link: string;

  @ApiProperty({
    example: "photo.jpg",
    description: "Admin photo",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string;

  @ApiProperty({
    example: "2dfArd0GHJ6fghs9G8",
    description: "Admin hashed password",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: false,
    description: "Admin activligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Admin creatorligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: "2wa23NdfSDdHJ34sffae2r4fadf23edf",
    description: "Admin hashed refresh token",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;
}
