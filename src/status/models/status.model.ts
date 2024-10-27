import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Cart } from "../../cart/models/cart.model";

interface IStatusCreationAttr {
  status_name: string;
}

@Table({ tableName: "status", timestamps: false })
export class Status extends Model<Status, IStatusCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Status unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "faol",
    description: "Status turi",
  })
  @Column({
    type: DataType.STRING,
  })
  status_name: string;

  @HasMany(() => Cart)
  carts: Cart[];
}
