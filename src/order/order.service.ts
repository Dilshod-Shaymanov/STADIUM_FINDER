import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./models/order.model";
import { InjectBot } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    // @InjectBot() private bot: Telegraf<Context>
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const new_order = await this.orderModel.create(createOrderDto);
      const order = await this.orderModel.findByPk(new_order.id, {
        include: { all: true },
      });
      // await this.bot.telegram.sendMessage(process.env.GROUP_ID, `${order}`);
      return order;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: { all: true },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const [affectedRows, [updatedOrder]] = await this.orderModel.update(
      updateOrderDto,
      {
        where: { id },
        returning: true,
      }
    );
    if (!affectedRows) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const affectedRows = await this.orderModel.destroy({ where: { id } });
    if (!affectedRows) {
      throw new NotFoundException(`Stadium with ID ${id} not found`);
    }
  }
}
