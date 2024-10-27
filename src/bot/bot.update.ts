import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { inlineKeyboard } from "telegraf/typings/markup";
import { BotService } from "./bot.service";
import { AddressService } from "./address.service";
import { CarsService } from "./cars.service";
import { UseFilters, UseGuards } from "@nestjs/common";
import { TelegrafExceptionFilter } from "../filters/telegraf-exception.filter";
import { AdminGuard } from "../guards/admin.guard";

@Update()
export class BotUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly addressService: AddressService,
    private readonly carsService: CarsService
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @UseFilters(TelegrafExceptionFilter)
  @UseGuards(AdminGuard)
  @Command("admin")
  async onAdminCommmand(@Ctx() ctx: Context) {
    await this.botService.admin_menu(ctx, `Xush kelibsiz ADMIN 🙋‍♂️`);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    await this.addressService.onAddress(ctx);
  }

  @Hears("Yangi manzil qo'shish")
  async addNewAddress(@Ctx() ctx: Context) {
    await this.addressService.addNewAddress(ctx);
  }

  @Hears("Mening manzillarim")
  async getAllMyAddreses(@Ctx() ctx: Context) {
    await this.addressService.getAllMyAddreses(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    await this.addressService.onLocation(ctx);
  }

  @Action(/^location_\d+$/)
  async onClickLocation(@Ctx() ctx: Context) {
    await this.addressService.onClickLocation(ctx);
  }

  @Command("cars")
  async onCars(@Ctx() ctx: Context) {
    await this.carsService.onCars(ctx);
  }

  @Command("search")
  async onSearch(@Ctx() ctx: Context) {
    await this.addressService.onSearch(ctx);
  }

  @Hears("Yangi mashina qo'shish")
  async addNewCar(@Ctx() ctx: Context) {
    await this.carsService.addNewCar(ctx);
  }

  @Hears("Mening mashinalarim")
  async getAllMyCars(@Ctx() ctx: Context) {
    await this.carsService.getAllMyCars(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.addressService.onText(ctx);
  }

  // @Start()
  // async onStart(@Ctx() ctx: Context) {
  //   await ctx.reply("Bot ishga tushdi");
  // }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message) {
  //     console.log(ctx.message.photo);

  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message) {
  //     console.log(ctx.message.video);

  //     await ctx.reply(String(ctx.message.video.file_name));
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message) {
  //     console.log(ctx.message.sticker);

  //     await ctx.reply("👍");
  //     await ctx.reply(ctx.message.sticker.emoji);
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message) {
  //     console.log(ctx.message.animation);

  //     await ctx.reply(String(ctx.message.animation.duration));
  //   }
  // }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   await this.botService.onContact(ctx);

  //   if ("contact" in ctx.message) {
  //     console.log(ctx.message.contact);

  //     await ctx.reply(String(ctx.message.contact.first_name));
  //     await ctx.reply(String(ctx.message.contact.last_name));
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //   }
  // }

  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if ("location" in ctx.message) {
  //     console.log(ctx.message.location);

  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.longitude
  //     );
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message) {
  //     console.log(ctx.message.voice);

  //     await ctx.reply(String(ctx.message.voice.duration));
  //     await ctx.reply(String(ctx.message.voice.file_id));
  //     await ctx.reply(String(ctx.message.voice.file_size));
  //     await ctx.reply(String(ctx.message.voice.mime_type));
  //   }
  // }

  // @On("invoice") // to'lovlarni amalga oshirgan paytda kerak bo'ladi
  // async onInVoice(@Ctx() ctx: Context) {
  //   if ("invoice" in ctx.message) {
  //     console.log(ctx.message.invoice);

  //     await ctx.reply(String(ctx.message.invoice.currency));
  //     await ctx.reply(String(ctx.message.invoice.description));
  //     await ctx.reply(String(ctx.message.invoice.start_parameter));
  //     await ctx.reply(String(ctx.message.invoice.title));
  //     await ctx.reply(String(ctx.message.invoice.total_amount));
  //   }
  // }

  // @On("document")
  // async onDocumnet(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message) {
  //     console.log(ctx.message.document);

  //     await ctx.reply(String(ctx.message.document.file_name));
  //     await ctx.reply(String(ctx.message.document.file_size));
  //     await ctx.reply(String(ctx.message.document.file_id));
  //   }
  // }

  // @Hears("hi")
  // async hearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply("Hey, there!");
  // }

  // @Command("help")
  // async commandHelp(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(
  //     `<b> start</b> - Botni ishga tushirish\n<b> stop</b> - Botni to'xtatish\n<b> help</b> - Ushbu buyruqlarni ko'rsatish`
  //   );
  // }

  // @Command("inline")
  // async inlineButtons(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: "Button 1",
  //         callback_data: "button_1",
  //       },
  //       {
  //         text: "Button 2",
  //         callback_data: "button_2",
  //       },
  //       {
  //         text: "Button 3",
  //         callback_data: "button_3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 4",
  //         callback_data: "button4",
  //       },
  //       {
  //         text: "Button 5",
  //         callback_data: "button_5",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 6",
  //         callback_data: "button_6",
  //       },
  //     ],
  //   ];
  //   await ctx.reply("Kerakli Inline buttonni tanlang:", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action("button_1")
  // async onClickButton1(@Ctx() ctx: Context) {
  //   await ctx.reply("Button1 tugmasi bosildi");
  // }
  // @Action("button_2")
  // async onClickButton2(@Ctx() ctx: Context) {
  //   await ctx.reply("Button2 tugmasi bosildi");
  // }
  // @Action(/^button_+\d+$/) // univerlsal funcktion
  // async onClickAnyButton(@Ctx() ctx: Context) {
  //   const actText: String = ctx.callbackQuery["data"];
  //   const button_id = Number(actText.split("_")[1]);
  //   await ctx.reply(`Ixtiyoriy Button ${button_id} tugmasi bosildi`);
  // }

  // @Command("main")
  // async mainButtons(@Ctx() ctx: Context) {
  //   await ctx.reply("Kerakli Main buttonni tanlang:", {
  //     parse_mode: "HTML",
  //     ...Markup.keyboard([
  //       ["bir", "ikki", "uch"],
  //       ["tort", "besh", "olti"],
  //       [Markup.button.contactRequest("📞 Telefon raqamini yuboring")],
  //       [Markup.button.contactRequest("🎆 Lokatsiyani yuboring")],
  //       [Markup.button.contactRequest("📧 Ma'lumot yuboring")],
  //     ]).resize(),
  //     // .onTime(), // bosganda yo'qolib qoladi
  //   });
  // }

  // @Hears("bir")
  // async onBirButton(@Ctx() ctx: Context) {
  //   await ctx.reply("Bir tugmasi bosildi");
  // }

  // @On("text") // eng oxirida text va message turadi
  // async onText(@Ctx() ctx: Context) {
  //   console.log(ctx); // tekshirish kerak
  //   if ("text" in ctx.message) {
  //     if (ctx.message.text == "salom") {
  //       await ctx.replyWithHTML("<b> Hello! </b>");
  //     } else {
  //       await ctx.replyWithHTML(ctx.message.text);
  //     }
  //   }
  // }

  // @On("message") // Ixtiyoriy xabbarlarni on messagedan ushlab olamiz eng oxirida yozamiz
  // async onMessage(@Ctx() ctx: Context) {
  //   console.log(ctx.botInfo);
  //   console.log(ctx.chat);
  //   console.log(ctx.chat.id);
  //   console.log(ctx.from);
  //   console.log(ctx.from.first_name);
  //   console.log(ctx.from.language_code);
  // }
}
