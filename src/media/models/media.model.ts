import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Stadium } from "../../stadium/models/stadium.model";

interface IMediaCreationAttr {
  stadiumId: number;
  photo: string;
  description: string;
}

@Table({ tableName: "media", timestamps: false })
export class Media extends Model<Media, IMediaCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Media unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "Stadium Id",
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number;

  @ApiProperty({
    example: "photo.jpg",
    description: "Stadium photo",
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: "Of the best stadium",
    description: "Stadium description",
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
