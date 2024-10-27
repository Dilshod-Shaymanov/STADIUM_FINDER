import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import { StadiumService } from "./stadium.service";
import { CreateStadiumDto } from "./dto/create-stadium.dto";
import { UpdateStadiumDto } from "./dto/update-stadium.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Stadium } from "./models/stadium.model";

@ApiTags("Stadium (Stadion)")
@Controller("stadium")
export class StadiumController {
  constructor(private readonly stadiumService: StadiumService) {}

  @ApiOperation({ summary: "Yangi Stadion qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi stadion qo'shildi",
    type: Stadium,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createStadiumDto: CreateStadiumDto): Promise<Stadium> {
    return this.stadiumService.create(createStadiumDto);
  }

  @ApiOperation({ summary: "Barcha Stadionlarni chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Barcha stadionlar ro'yxati",
    type: [Stadium],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Stadium[]> {
    return this.stadiumService.findAll();
  }

  @ApiOperation({ summary: "Stadionni ID orqali topish" })
  @ApiResponse({
    status: 200,
    description: "ID orqali topilgan stadion",
    type: Stadium,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Stadium> {
    return this.stadiumService.findOne(id);
  }

  @ApiOperation({ summary: "Stadionni ID orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "ID orqali yangilangan stadion",
    type: Stadium,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateStadiumDto: UpdateStadiumDto
  ): Promise<Stadium> {
    return this.stadiumService.update(id, updateStadiumDto);
  }

  @ApiOperation({ summary: "Stadionni ID orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Stadion o'chirildi",
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.stadiumService.remove(id);
  }
}
