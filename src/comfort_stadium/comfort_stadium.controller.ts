import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ComfortStadiumService } from './comfort_stadium.service';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';
import { ComfortStadium } from './models/comfort_stadium.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Comfort Stadium")
@Controller("comfort-stadium")
export class ComfortStadiumController {
  constructor(private readonly comfortStadiumService: ComfortStadiumService) {}

  @ApiOperation({ summary: "Yangi Comfort Stadium qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Comfort Stadium qoshish",
    type: ComfortStadium,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createComfortStadiumDto: CreateComfortStadiumDto
  ): Promise<ComfortStadium> {
    return this.comfortStadiumService.create(createComfortStadiumDto);
  }

  @ApiOperation({ summary: "Comfort Stadiumlarni chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Comfort stadium",
    type: [ComfortStadium],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<ComfortStadium[]> {
    return this.comfortStadiumService.findAll();
  }

  @ApiOperation({ summary: "Comfort Stadiumni id orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Comfort stadiumni Id orqali topish",
    type: ComfortStadium,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<ComfortStadium> {
    return this.comfortStadiumService.findOne(id);
  }

  @ApiOperation({ summary: "Comfort Stadiumni id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Comfort stadiumni Id orqali yangilash",
    type: ComfortStadium,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateComfortStadiumDto: UpdateComfortStadiumDto
  ): Promise<ComfortStadium> {
    return this.comfortStadiumService.update(id, updateComfortStadiumDto);
  }

  @ApiOperation({ summary: "Comfort Stadiumni id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Comfort stadiumni Id orqali o'chirish",
    type: ComfortStadium,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<number> {
    return this.comfortStadiumService.remove(id);
  }
}
