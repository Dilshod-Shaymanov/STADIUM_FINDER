import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comfort } from './models/comfort.model';

@ApiTags('Comforts (Qulayliklar)')
@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @ApiOperation({ summary: "Comfortga yangi comfort nomini qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Comfort qoshish',
    type: Comfort,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createComfortDto: CreateComfortDto): Promise<Comfort> {
    return this.comfortService.create(createComfortDto);
  }

  @ApiOperation({ summary: "Barcha comfort nomlarini ko'rish" })
  @ApiResponse({
    status: 200,
    description: 'Comfort nomlarini korish',
    type: [Comfort],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Comfort[]> {
    return this.comfortService.findAll();
  }

  @ApiOperation({ summary: "Comfort nomini Id bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: 'Comfort nomini Id bilan izlash',
    type: Comfort,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Comfort> {
    return this.comfortService.findOne(id);
  }

  @ApiOperation({ summary: "Comfort nomini Id bo'yicha yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Comfort nomini Id orqali yangilash',
    type: Comfort,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateComfortDto: UpdateComfortDto,
  ): Promise<Comfort> {
    return this.comfortService.update(id, updateComfortDto);
  }

  @ApiOperation({ summary: "Comfort nomini Id bo'yicha o'chirish" })
  @ApiResponse({
    status: 200,
    description: 'Comfort nomini Id orqali ochirish',
    type: Comfort,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.comfortService.remove(id);
  }
}
