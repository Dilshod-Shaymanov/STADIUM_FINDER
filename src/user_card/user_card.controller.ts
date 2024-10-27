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
import { UserCardService } from "./user_card.service";
import { CreateUserCardDto } from "./dto/create-user_card.dto";
import { UpdateUserCardDto } from "./dto/update-user_card.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserCard } from "./models/user_card.model";

@ApiTags("User Cards (User plastic kartalari)")
@Controller("user-card")
export class UserCardController {
  constructor(private readonly userCardService: UserCardService) {}

  @ApiOperation({ summary: "Yangi User Card qo'shish" })
  @ApiResponse({
    status: 201,
    description: "User Card qoshish",
    type: UserCard,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createUserCardDto: CreateUserCardDto
  ): Promise<UserCard> {
    return this.userCardService.create(createUserCardDto);
  }

  @ApiOperation({ summary: "User Cardlarini chiqarish" })
  @ApiResponse({
    status: 200,
    description: "User Cardlar",
    type: [UserCard],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<UserCard[]> {
    return this.userCardService.findAll();
  }

  @ApiOperation({ summary: "User Card id orqali topish" })
  @ApiResponse({
    status: 200,
    description: "User Card Id orqali topish",
    type: UserCard,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<UserCard> {
    return this.userCardService.findOne(id);
  }

  @ApiOperation({ summary: "User Card id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "User Card Id orqali yangilash",
    type: UserCard,
  })
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateUserCardDto: UpdateUserCardDto
  ): Promise<UserCard> {
    return this.userCardService.update(id, updateUserCardDto);
  }

  @ApiOperation({ summary: "User Card id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "User Card By Id delete",
    type: UserCard,
  })
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<number> {
    return this.userCardService.remove(id);
  }
}
