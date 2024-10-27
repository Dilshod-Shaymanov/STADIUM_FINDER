import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { Address } from "./models/address.model";
import { AddressService } from "./address.service";
import { Cars } from "./models/cars.model";
import { CarsService } from "./cars.service";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address, Cars])],
  controllers: [],
  providers: [BotService, AddressService, CarsService,  BotUpdate],
  exports: [BotService, AddressService, CarsService],
})
export class BotModule {}
