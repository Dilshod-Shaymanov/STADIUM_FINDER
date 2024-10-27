import { Injectable } from "@nestjs/common";
import { CreateBotDto } from "./dto/create-bot.dto";
import { UpdateBotDto } from "./dto/update-bot.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Address } from "./models/address.model";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectModel(Address) private addressModel: typeof Address,
    @InjectBot(BOT_NAME) private bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await this.botModel.create({
          user_id: userId,
          username: ctx.from.username,
          first_name: ctx.from.first_name,
          last_name: ctx.from.last_name,
          language: ctx.from.language_code,
          is_premium: ctx.from.is_premium,
        });

        await ctx.reply(
          `Iltimos, <b> "📞 Telefon raqamingizni yiboring"</b> tugmasini bosing`,
          {
            parse_mode: "HTML",
            ...Markup.keyboard([
              [
                Markup.button.contactRequest(
                  "📞 Telefon raqamingizni yuboring"
                ),
              ],
            ])
              .resize()
              .oneTime(),
          }
        );
      } else if (!user.status) {
        await ctx.reply(
          `Iltimos, <b> "📞 Telefon raqamingizni yiboring"</b> tugmasini bosing`,
          {
            parse_mode: "HTML",
            ...Markup.keyboard([
              [
                Markup.button.contactRequest(
                  "📞 Telefon raqamingizni yuboring"
                ),
              ],
            ])
              .resize()
              .oneTime(),
          }
        );
      } else {
        await ctx.reply(
          `Bu bot stadion egalarini faollashtirish uchun ishlatiladi`,
          {
            parse_mode: "HTML",
            ...Markup.removeKeyboard(),
          }
        );
      }
    } catch (error) {
      console.log("start", error);
    }
  }

  async onContact(ctx: Context) {
    try {
      if ("contact" in ctx.message) {
        const userId = ctx.from.id;
        const user = await this.botModel.findByPk(userId);
        if (!user) {
          await ctx.reply(`Iltimos Start tugmasini bosing`, {
            parse_mode: "HTML",
            ...Markup.keyboard([["/start"]])
              .resize()
              .oneTime(),
          });
        } else if (ctx.message.contact.user_id != userId) {
          await ctx.reply(`Iltimos o'zingizni telefon raqamingizni yuboring`, {
            parse_mode: "HTML",
            ...Markup.keyboard([
              Markup.button.contactRequest("📞 Telefon raqamingizni yiboring"),
            ])
              .resize()
              .oneTime(),
          });
        } else {
          await this.botModel.update(
            {
              phone_number: ctx.message.contact.phone_number,
              status: true,
            },
            {
              where: { user_id: userId },
            }
          );
          await ctx.reply(`👍 Tabriklaymiz siz faolashtirildingiz`, {
            parse_mode: "HTML",
            ...Markup.removeKeyboard(),
          });
        }
      }
    } catch (error) {
      console.log("onContact", error);
    }
  }

  async onStop(ctx: Context) {
    try {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Siz avval ro'yhatdan o'tmagansiz.`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else if (user.status) {
        await this.botModel.update(
          {
            status: false,
            phone_number: null,
          },
          {
            where: { user_id: userId },
          }
        );

        await this.bot.telegram.sendChatAction(user.user_id, "typing");

        await ctx.reply(`Siz botdan chiqdingiz`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log("onStop", error);
    }
  }

  // ========================

  async sendOtp(phone_number: string, OTP: string): Promise<boolean> {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }

      await this.bot.telegram.sendChatAction(user.user_id, "typing");

      await this.bot.telegram.sendMessage(
        user.user_id,
        "VerifyOTP code: " + OTP
      );
      return true;
    } catch (error) {
      console.log("sendOtp", error);
    }
  }

  async admin_menu(ctx: Context, menu_text = `<b>Admin menyusi</b>`) {
    try {
      await ctx.reply(menu_text, {
        parse_mode: "HTML",
        ...Markup.keyboard([["Mijozlar", "Ustalar"]])
          .oneTime()
          .resize(),
      });
    } catch (error) {
      console.log("Admin Menusida xatolik", error);
    }
  }
}
