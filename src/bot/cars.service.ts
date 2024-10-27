import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InjectBot } from "nestjs-telegraf";
import { Address } from "./models/address.model";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Bot } from "./models/bot.model";
import { Cars } from "./models/cars.model";

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Address) private addressModel: typeof Address,
    @InjectModel(Cars) private carsModel: typeof Cars,
    @InjectModel(Bot) private botMadel: typeof Bot,
    @InjectBot(BOT_NAME) private bot: Telegraf<Context>
  ) {}

  async onCars(ctx: Context) {
    try {
      await ctx.reply(`Mashinalarim`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          ["Mening mashinalarim", "Yangi mashina qo'shish"],
        ]).resize(),
      });
    } catch (error) {
      console.log("onCars", error);
    }
  }

  async addNewCar(ctx: Context) {
    try {
      const userId = ctx.from.id;
      const user = await this.botMadel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Siz avval ro'yhatdan o'tmagansiz.`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else {
        await this.carsModel.create({
          user_id: userId,
          last_state: "car_number",
        });
        await ctx.reply(`Mashina raqamini kiriting:`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log("addNewCar", error);
    }
  }

  async getAllMyCars(ctx: Context) {
    try {
      const userId = ctx.from.id;
      const user = await this.botMadel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Siz avval ro'yhatdan o'tmagansiz.`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else {
        const allCars = await this.carsModel.findAll({
          where: { user_id: userId },
        });
        allCars.forEach(async (car) => {
          await ctx.replyWithHTML(
            `<b>Mashina raqami:</b> ${car.car_number}\n<b>Mashina modeli:</b> ${car.model}\n<b>Mashina rangi:</b> ${car.color}\n<b>Mashina yili:</b> ${car.year}`
          );
        });
      }
    } catch (error) {
      console.log("getAllMyAddreses", error);
    }
  }
}
