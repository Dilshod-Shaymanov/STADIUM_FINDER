import { Injectable } from "@nestjs/common";
import { CreateUserCardDto } from "./dto/create-user_card.dto";
import { UpdateUserCardDto } from "./dto/update-user_card.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserCard } from "./models/user_card.model";

@Injectable()
export class UserCardService {
  constructor(@InjectModel(UserCard) private userCardModel: typeof UserCard) {}

  async create(createUserCardDto: CreateUserCardDto): Promise<UserCard> {
    return this.userCardModel.create(createUserCardDto);
  }

  async findAll(): Promise<UserCard[]> {
    return this.userCardModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<UserCard> {
    return this.userCardModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateUserCardDto: UpdateUserCardDto
  ): Promise<UserCard> {
    const userCard = await this.userCardModel.update(updateUserCardDto, {
      where: { id },
      returning: true,
    });
    return userCard[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.userCardModel.destroy({ where: { id } });
  }
}
