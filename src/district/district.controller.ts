import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { District } from './models/district.model';

@ApiTags('District (Kocha)')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: "Yangi District nomini qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'District qoshish',
    type: District,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createDistrictDto: CreateDistrictDto,
  ): Promise<District> {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: 'District nomlarini chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'District nomlari',
    type: [District],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<District[]> {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'District nomini id orqali topish' })
  @ApiResponse({
    status: 200,
    description: 'District nomini Id orqali topish',
    type: District,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<District> {
    return this.districtService.findOne(id);
  }

  @ApiOperation({ summary: 'District nomini id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'District nomini Id orqali yangilash',
    type: District,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    return this.districtService.update(id, updateDistrictDto);
  }

  @ApiOperation({ summary: "District nomini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: 'District Id orqali ochirish',
    type: District,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.districtService.remove(id);
  }
}
