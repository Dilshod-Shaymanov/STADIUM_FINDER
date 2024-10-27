import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadium } from '../../stadium/models/stadium.model';

interface ICategoryCreationAttr {
  name: string;
  parentId?: number;
}

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Category unikal ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'sport',
    description: 'Categorya nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Parent Category Id',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parentId?: number;

  @BelongsTo(() => Category, { foreignKey: 'parentId', targetKey: 'id' })
  parent_category: Category;

  @HasMany(() => Stadium)
  stadiums: Stadium[];
}
