import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Bot } from "./bot.model";

interface IAddressCreationAttr {
  user_id: number;
  address_name: string;
  address: string;
  location: string;
  last_state: string;
}
@Table({ tableName: "address" })
export class Address extends Model<Address, IAddressCreationAttr> {
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
  address_name: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  lon: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  last_state: string;

  @BelongsTo(() => Bot)
  user: Bot;
}
