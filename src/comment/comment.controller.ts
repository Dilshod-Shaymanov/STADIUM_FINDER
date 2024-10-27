import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './models/comment.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Comment (komentarya)")
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: "Yangi District nomini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Comment qoshish",
    type: Comment,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: "Commentlarni chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Commentlar",
    type: [Comment],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: "Comment nomini id orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Comment nomini Id orqali topish",
    type: Comment,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @ApiOperation({ summary: "Comment nomini id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Comment nomini Id orqali yangilash",
    type: Comment,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiOperation({ summary: "Comment nomini id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Comment nomini Id orqali o'chirish",
    type: Comment,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<number> {
    return this.commentService.remove(id);
  }
}
