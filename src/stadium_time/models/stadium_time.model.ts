import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Order } from "../../order/models/order.model";
import { Stadium } from "../../stadium/models/stadium.model"; // ForeignKey uchun

interface IStadiumTimesCreationAttr {
  stadiumId: number;
  start_time: string;
  end_time: string;
  price: number;
}

@Table({ tableName: "stadium_time", timestamps: true })
export class StadiumTime extends Model<StadiumTime, IStadiumTimesCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Stadium time unikal ID raqami (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "Stadium ID raqami (ForeignKey)",
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number;

  @ApiProperty({
    example: "11:30",
    description: "Boshlanish vaqti (HH:mm)",
  })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty({
    example: "13:00",
    description: "Tugash vaqti (HH:mm)",
  })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  end_time: string;

  @ApiProperty({
    example: 500000.0,
    description: "Stadium vaqt narxi (500000.00)",
  })
  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  price: number;

  @HasMany(() => Order)
  orders: Order[];

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
