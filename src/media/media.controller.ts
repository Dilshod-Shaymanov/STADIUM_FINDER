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
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Media } from "./models/media.model";

@ApiTags("Media (Media)")
@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({ summary: "Yangi District nomini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Media qoshish",
    type: Media,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createMediaDto: CreateMediaDto): Promise<Media> {
    return this.mediaService.create(createMediaDto);
  }

  @ApiOperation({ summary: "Media nomlarini chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Media nomlari",
    type: [Media],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Media[]> {
    return this.mediaService.findAll();
  }

  @ApiOperation({ summary: "Media nomini id orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Media nomini Id orqali topish",
    type: Media,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<Media> {
    return this.mediaService.findOne(id);
  }

  @ApiOperation({ summary: "Media nomini id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Media nomini Id orqali yangilash",
    type: Media,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateMediaDto: UpdateMediaDto
  ) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @ApiOperation({ summary: "Media nomini id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Media nomini Id orqali o'chirish",
    type: Media,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<number> {
    return this.mediaService.remove(id);
  }
}
