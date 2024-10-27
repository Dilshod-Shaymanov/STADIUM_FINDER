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
  ParseIntPipe, // ParseIntPipe qo'shildi
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@ApiTags("Admin (Adminlar)")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Yangi Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin qoshish",
    type: Admin,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Adminlarni chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Admin nomlari",
    type: [Admin],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "Admin nomini id orqli topish" })
  @ApiResponse({
    status: 200,
    description: "Admin nomini Id orqali topish",
    type: Admin,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: "Admin nomini id orqli yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin nomini Id orqali yangilash",
    type: Admin,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ): Promise<Admin> {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: "Admin nomini id orqli o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin nomini Id orqali o'chirish",
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<number> {
    return this.adminService.remove(id);
  }
}
