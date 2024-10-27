import { Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart } from "./models/cart.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartModel: typeof Cart) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartModel.create(createCartDto);
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Cart> {
    return this.cartModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartModel.update(updateCartDto, {
      where: { id },
      returning: true,
    });
    return cart[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.cartModel.destroy({ where: { id } });
  }
}
