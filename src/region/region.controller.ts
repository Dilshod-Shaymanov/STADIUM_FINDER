import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from './models/region.model';

@ApiTags('Region (Viloyat)')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: "Yangi Region nomini qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Region qoshish',
    type: Region,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Region nomlarini chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Region nomlari',
    type: [Region],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Region[]> {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Region nomini id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Region nomini Id orqali topish',
    type: Region,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Region> {
    return this.regionService.findOne(id);
  }

  @ApiOperation({ summary: 'Region nomini Id orqali yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Region Id orqali yangilash',
    type: Region,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    return this.regionService.update(id, updateRegionDto);
  }

  @ApiOperation({ summary: "Region nomini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: 'Region Id orqali ochirish',
    type: Region,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.regionService.remove(id);
  }
}
