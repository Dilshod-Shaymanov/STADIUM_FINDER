import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return category[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.categoryModel.destroy({ where: { id } });
  }
}
