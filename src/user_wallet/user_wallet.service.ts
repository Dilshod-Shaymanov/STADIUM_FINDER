import { Injectable } from "@nestjs/common";
import { CreateUserWalletDto } from "./dto/create-user_wallet.dto";
import { UpdateUserWalletDto } from "./dto/update-user_wallet.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserWallet } from "./models/user_wallet.model";

@Injectable()
export class UserWalletService {
  constructor(
    @InjectModel(UserWallet) private userWalletModel: typeof UserWallet
  ) {}

  async create(createUserWalletDto: CreateUserWalletDto): Promise<UserWallet> {
    return this.userWalletModel.create(createUserWalletDto);
  }

  async findAll(): Promise<UserWallet[]> {
    return this.userWalletModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<UserWallet> {
    return this.userWalletModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateUserWalletDto: UpdateUserWalletDto
  ): Promise<UserWallet> {
    const userWallet = await this.userWalletModel.update(updateUserWalletDto, {
      where: { id },
      returning: true,
    });
    return userWallet[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.userWalletModel.destroy({ where: { id } });
  }
}
