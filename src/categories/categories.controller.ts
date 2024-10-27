import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './models/category.model';

@ApiTags('Categories (Kategoriyalar)')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Yangi Categorya nomini qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Categorya qoshish',
    type: Category,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Categorya nomlarini chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Categorya nomlari',
    type: [Category],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Categorya nomini id orqali topish' })
  @ApiResponse({
    status: 200,
    description: 'Categorya nomini Id orqali topish',
    type: Category,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Categorya nomini id orqali yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Categorya nomini Id orqali yangilash',
    type: Category,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Categorya nomini id orqali ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Categorya nomini Id orqali ochirish',
    type: Category,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.categoriesService.remove(id);
  }
}
