import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Stadium } from '../../stadium/models/stadium.model';
import { ComfortStadium } from '../../comfort_stadium/models/comfort_stadium.entity';

interface IComfortCreationAttr {
  name: string;
}

@Table({ tableName: "comfort", timestamps: false })
export class Comfort extends Model<Comfort, IComfortCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Comford jadvalining unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Comfort",
    description: "Comfort nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Stadium, () => ComfortStadium)
  stadiums: Stadium[];
}
