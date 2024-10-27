import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./models/order.model";
import { TelegrafModule } from "nestjs-telegraf";

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
