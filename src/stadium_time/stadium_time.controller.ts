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
import { StadiumTimeService } from "./stadium_time.service";
import { CreateStadiumTimeDto } from "./dto/create-stadium_time.dto";
import { UpdateStadiumTimeDto } from "./dto/update-stadium_time.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StadiumTime } from "./models/stadium_time.model";

@ApiTags("Stadium Time (Stadion vaqtlari)")
@Controller("stadium-time")
export class StadiumTimeController {
  constructor(private readonly stadiumTimeService: StadiumTimeService) {}

  @ApiOperation({ summary: "Yangi Stadion vaqtini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi stadion vaqti muvaffaqiyatli qo'shildi",
    type: StadiumTime,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() createStadiumTimeDto: CreateStadiumTimeDto
  ): Promise<StadiumTime> {
    return this.stadiumTimeService.create(createStadiumTimeDto);
  }

  @ApiOperation({ summary: "Barcha stadion vaqtlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha stadion vaqtlarining ro'yxati",
    type: [StadiumTime],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(): Promise<StadiumTime[]> {
    return this.stadiumTimeService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha stadion vaqtini olish" })
  @ApiResponse({
    status: 200,
    description: "ID bo'yicha topilgan stadion vaqti",
    type: StadiumTime,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<StadiumTime> {
    return this.stadiumTimeService.findOne(id);
  }

  @ApiOperation({ summary: "ID bo'yicha stadion vaqtini yangilash" })
  @ApiResponse({
    status: 200,
    description: "ID bo'yicha stadion vaqti yangilandi",
    type: StadiumTime,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateStadiumTimeDto: UpdateStadiumTimeDto
  ): Promise<StadiumTime> {
    return this.stadiumTimeService.update(id, updateStadiumTimeDto);
  }

  @ApiOperation({ summary: "ID bo'yicha stadion vaqtini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "ID bo'yicha stadion vaqti o'chirildi",
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.stadiumTimeService.remove(id);
  }
}
