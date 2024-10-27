import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Bot } from "./bot.model";

interface ICarsCreationAttr {
  user_id: number;
  car_number: string;
  model: string;
  color: string;
  year: number;
  last_state: string;
}
@Table({ tableName: "cars" })
export class Cars extends Model<Cars, ICarsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Bot)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
  })
  car_number: string;

  @Column({
    type: DataType.STRING,
  })
  model: string;

  @Column({
    type: DataType.STRING,
  })
  color: string;

  @Column({
    type: DataType.STRING,
  })
  year: string;

  @Column({
    type: DataType.STRING,
  })
  last_state: string;

  @BelongsTo(() => Bot)
  user: Bot;
}
