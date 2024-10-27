import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Address } from "./address.model";

interface IBotCreationAttr {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  language: string;
  is_premium: boolean;
}
@Table({ tableName: "bot" })
export class Bot extends Model<Bot, IBotCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  language: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_premium: boolean;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;

  @HasMany(() => Address)
  addresses: Address[];
}
