import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Stadium } from "../../stadium/models/stadium.model";

interface ICommentCreationAttr {
  userId: number;
  stadiumId: number;
  impression: string;
}

@Table({ tableName: "commet", timestamps: false })
export class Comment extends Model<Comment, ICommentCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Comment unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "User Id (ForiegnKey)",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: "Stadium Id (ForiegnKey)",
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number;

  @ApiProperty({
    example: "zo'r",
    description: "Tasurot qoldirish",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  impression: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
