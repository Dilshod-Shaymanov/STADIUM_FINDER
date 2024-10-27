import { ApiProperty } from "@nestjs/swagger";
import {
    BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "../../categories/models/category.model";
import { Region } from "../../region/models/region.model";
import { User } from "../../users/models/user.model";
import { District } from "../../district/models/district.model";
import { StadiumTime } from "../../stadium_time/models/stadium_time.model";
import { Media } from "../../media/models/media.model";
import { Comment } from "../../comment/models/comment.model";
import { ComfortStadium } from "../../comfort_stadium/models/comfort_stadium.entity";
import { Comfort } from "../../comfort/models/comfort.model";

interface IStadiumCreationAtttr {
  categoryId: number;
  ownerId: number;
  contact_with: string;
  name: string;
  volume: number;
  address: string;
  regionId: number;
  districtId: number;
  location: string[];
  buildAt: Date;
  start_time: string;
  end_time: string;
}

@Table({ tableName: "stadium", timestamps: false })
export class Stadium extends Model<Stadium, IStadiumCreationAtttr> {
  @ApiProperty({
    example: 1,
    description: "Stadium unikal ID raqami (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "Category Id raqami (ForeignKey)",
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @ApiProperty({
    example: 1,
    description: "Owner Id raqami (ForeignKey)",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @ApiProperty({
    example: "stadium_finder_uzb_bot",
    description: "Stadium finder uzb bot nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contact_with: string;

  @ApiProperty({
    example: "Best Stadium",
    description: "Stadium nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 500,
    description: "Stadion hajmi (Integer)",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  volume: number;

  @ApiProperty({
    example: "Toshkent shahar",
    description: "Stadium manzili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({
    example: 1,
    description: "Region Id raqami (ForeignKey)",
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  regionId: number;

  @ApiProperty({
    example: 1,
    description: "District Id raqami (ForeignKey)",
  })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  districtId: number;

  @ApiProperty({
    example: "123.245.2435.3245,121.1234.134.1234",
    description: "Stadium locatsiyasi",
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  location: string[];

  @ApiProperty({
    example: "2024-11-23",
    description: "Stadium Qurilgan sanasi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  buildAt: Date;

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

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => User)
  owner: User;

  @BelongsTo(() => Region)
  region: Region;

  @BelongsTo(() => District)
  district: District;

  @HasMany(() => StadiumTime)
  stadium_times: StadiumTime[];

  @HasMany(() => Media)
  media: Media[];

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => Comfort, () => ComfortStadium)
  comforts: Comfort[];
}
