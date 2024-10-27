import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Stadium } from "../../stadium/models/stadium.model";
import { Comfort } from "../../comfort/models/comfort.model";

interface IComfortStadiumCreationAttr {
    stadiumId: number;
    comfortId: number;
}

@Table({ tableName: "confort_stadium", timestamps: false })
export class ComfortStadium extends Model<
  ComfortStadium,
  IComfortStadiumCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Stadium Id (foriegnKey)",
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number;

  @ApiProperty({
    example: 1,
    description: "Comfort Id (foriegnKey)",
  })
  @ForeignKey(() => Comfort)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  comfortId: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @BelongsTo(() => Comfort)
  comfort: Comfort;
}
