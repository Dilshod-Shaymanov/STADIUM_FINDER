import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './models/status.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Status")
@Controller("status")
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: "Yangi Status nomini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Status qoshish",
    type: Status,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createStatusDto: CreateStatusDto): Promise<Status> {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: "Status nomlarini chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Status nomlari",
    type: [Status],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Status[]> {
    return this.statusService.findAll();
  }

  @ApiOperation({ summary: "Status nomini id orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Status nomini Id orqali topish",
    type: Status,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Status> {
    return this.statusService.findOne(id);
  }

  @ApiOperation({ summary: "Status nomini id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Status nomini Id orqali yangilash",
    type: Status,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateStatusDto: UpdateStatusDto
  ): Promise<Status> {
    return this.statusService.update(id, updateStatusDto);
  }

  @ApiOperation({ summary: "Status nomini id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Status nomini Id orqali o'chirish",
    type: Status,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<number> {
    return this.statusService.remove(id);
  }
}
