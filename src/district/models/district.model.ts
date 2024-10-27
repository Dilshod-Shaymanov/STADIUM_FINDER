import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/models/region.model';
import { Stadium } from '../../stadium/models/stadium.model';

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district", timestamps: false })
export class District extends Model<District, IDistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "District unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Chilonzor",
    description: "District nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: "Region Id",
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Stadium)
  stadiums: Stadium[];
}
