import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { District } from '../../district/models/district.model';
import { Stadium } from '../../stadium/models/stadium.model';

interface IRegionCreationAttr {
  name: string;
}

@Table({ tableName: "region", timestamps: false })
export class Region extends Model<Region, IRegionCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Region unikal ID raqami (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Toshkent",
    description: "Region nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => District)
  districts: District[];

  @HasMany(() => Stadium)
  stadiums: Stadium[];
}
