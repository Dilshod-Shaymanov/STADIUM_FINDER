import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./models/comment.model";

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private commetModel: typeof Comment) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commetModel.create(createCommentDto);
  }

  async findAll(): Promise<Comment[]> {
    return this.commetModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Comment> {
    return this.commetModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    const comment = await this.commetModel.update(updateCommentDto, {
      where: { id },
      returning: true,
    });
    return comment[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.commetModel.destroy({ where: { id } });
  }
}
