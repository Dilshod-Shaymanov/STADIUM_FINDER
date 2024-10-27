import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InjectBot } from "nestjs-telegraf";
import { Address } from "./models/address.model";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Bot } from "./models/bot.model";
import { Cars } from "./models/cars.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address) private addressModel: typeof Address,
    @InjectModel(Cars) private carsModel: typeof Cars,
    @InjectModel(Bot) private botMadel: typeof Bot,
    @InjectBot(BOT_NAME) private bot: Telegraf<Context>
  ) {}

  async onAddress(ctx: Context) {
    try {
      await ctx.reply(`Manzillarim`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          ["Mening manzillarim", "Yangi manzil qo'shish"],
        ]).resize(),
      });
    } catch (error) {
      console.log("onAddress", error);
    }
  }

  async addNewAddress(ctx: Context) {
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
        await this.addressModel.create({
          user_id: userId,
          last_state: "address_name",
        });
        await ctx.reply(`Mazil nomi kiriting:`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log("addNewAddress", error);
    }
  }

  async onText(ctx: Context) {
    try {
      if ("text" in ctx.message) {
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
          const address = await this.addressModel.findOne({
            where: { user_id: userId },
            order: [["id", "DESC"]],
          });
          if (address && address.last_state !== "finish") {
            if (address.last_state == "address_name") {
              address.address_name = ctx.message.text;
              address.last_state = "address";
              await address.save();
              await ctx.reply(`Mazilni kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (address.last_state == "address") {
              address.address = ctx.message.text;
              address.last_state = "location";
              await address.save();
              await ctx.reply(`Mazilingiz lokatsiyasini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.keyboard([
                  [Markup.button.locationRequest("🎈Locatsiyani yuborish")],
                ]).resize(),
              });
            }
          }
          const car = await this.carsModel.findOne({
            where: { user_id: userId },
            order: [["id", "DESC"]],
          });
          if (car) {
            if (car.last_state == "car_number") {
              car.car_number = ctx.message.text;
              car.last_state = "model";
              await car.save();
              await ctx.reply(`Mashina modelini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (car.last_state == "model") {
              car.model = ctx.message.text;
              car.last_state = "color";
              await car.save();
              await ctx.reply(`Mashina rangini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (car.last_state == "color") {
              car.color = ctx.message.text;
              car.last_state = "year";
              await car.save();
              await ctx.reply(`Mashina yilini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (car.last_state == "year") {
              car.year = ctx.message.text;
              car.last_state = "finish";
              await car.save();
              await ctx.reply(
                `Mashina ma'lumotlari muvaffaqiyatli qo'shildi!:`,
                {
                  parse_mode: "HTML",
                  ...Markup.keyboard([
                    ["Mening mashinalarim", "Yangi mashina qo'shish"],
                  ]).resize(),
                }
              );
            }
          }
        }
      }
    } catch (error) {
      console.log("onText", error);
    }
  }

  async onLocation(ctx: Context) {
    try {
      if ("location" in ctx.message) {
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
          const address = await this.addressModel.findOne({
            where: { user_id: userId },
            order: [["id", "DESC"]],
          });
          if (address) {
            if (address.last_state == "location") {
              address.location = `${ctx.message.location.latitude}, ${ctx.message.location.longitude}`;
              address.last_state = "finish";
              await address.save();
              await ctx.reply(`Mazilingiz muvaffaqiyatli qo'shildi!:`, {
                parse_mode: "HTML",
                ...Markup.keyboard([
                  ["Mening manzillarim", "Yangi manzil qo'shish"],
                ]).resize(),
              });
            }
          }
        }
      }
    } catch (error) {
      console.log("onLocation", error);
    }
  }

  async onSearch(ctx: Context) {
    try {
      await ctx.reply(`Manzilngiz Lokotsiyasini yuboring`, {
        parse_mode: "HTML",
                ...Markup.keyboard([
                  [Markup.button.locationRequest("🎈Locatsiyani yuborish")],
                ]).resize(),
      });
    } catch (error) {
      console.log("onAddress", error);
    }
  }

  async getAllMyAddreses(ctx: Context) {
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
        const allAddresses = await this.addressModel.findAll({
          where: { user_id: userId },
        });
        allAddresses.forEach(async (address) => {
          await ctx.replyWithHTML(
            `<b>Manzil nomi:</b> ${address.address_name}\n<b>Manzil:</b> ${address.address}`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Lokatsiyani ko'rish",
                      callback_data: `location_${address.id}`,
                    },
                  ],
                ],
              },
            }
          );
        });
      }
    } catch (error) {
      console.log("getAllMyAddreses", error);
    }
  }

  async onClickLocation(ctx: Context) {
    try {
      const actText: String = ctx.callbackQuery["data"];
      const address_id = Number(actText.split("_")[1]);
      const address = await this.addressModel.findByPk(address_id);

      await ctx.replyWithLocation(
        Number(address.location.split(",")[0]),
        Number(address.location.split(",")[1])
      );
    } catch (error) {
      console.log("onClickLocation", error);
    }
  }
}
