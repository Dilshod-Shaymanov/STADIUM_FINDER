import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { ComfortModule } from "./comfort/comfort.module";
import { Comfort } from "./comfort/models/comfort.model";
import { RegionModule } from "./region/region.module";
import { Region } from "./region/models/region.model";
import { DistrictModule } from "./district/district.module";
import { District } from "./district/models/district.model";
import { CategoriesModule } from "./categories/categories.module";
import { Category } from "./categories/models/category.model";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { MailModule } from "./mail/mail.module";
import { UserCardModule } from "./user_card/user_card.module";
import { UserCard } from "./user_card/models/user_card.model";
import { UserWalletModule } from "./user_wallet/user_wallet.module";
import { UserWallet } from "./user_wallet/models/user_wallet.model";
import { BotModule } from "./bot/bot.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/models/order.model";
import { StadiumModule } from "./stadium/stadium.module";
import { Stadium } from "./stadium/models/stadium.model";
import { StadiumTimeModule } from "./stadium_time/stadium_time.module";
import { StadiumTime } from "./stadium_time/models/stadium_time.model";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { AuthModule } from "./auth/auth.module";
import { Bot } from "./bot/models/bot.model";
import { Address } from "./bot/models/address.model";
import { OtpModule } from "./otp/otp.module";
import { Cars } from "./bot/models/cars.model";
import { Otp } from "./otp/models/otp.model";
import { CartModule } from "./cart/cart.module";
import { MediaModule } from "./media/media.module";
import { Media } from "./media/models/media.model";
import { CommentModule } from "./comment/comment.module";
import { Comment } from "./comment/models/comment.model";
import { ComfortStadiumModule } from "./comfort_stadium/comfort_stadium.module";
import { ComfortStadium } from "./comfort_stadium/models/comfort_stadium.entity";
import { StatusModule } from "./status/status.module";
import { Status } from "./status/models/status.model";
import { Cart } from "./cart/models/cart.model";
import { SmsModule } from "./sms/sms.module";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Comfort,
        Region,
        District,
        Category,
        User,
        UserCard,
        UserWallet,
        Stadium,
        StadiumTime,
        Order,
        Admin,
        Bot,
        Address,
        Cars,
        Otp,
        Media,
        Comment,
        ComfortStadium,
        Status,
        Cart,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    ComfortModule,
    RegionModule,
    DistrictModule,
    CategoriesModule,
    UsersModule,
    MailModule,
    UserCardModule,
    UserWalletModule,
    BotModule,
    StadiumModule,
    StadiumTimeModule,
    OrderModule,
    AdminModule,
    AuthModule,
    OtpModule,
    MediaModule,
    CommentModule,
    ComfortStadiumModule,
    StatusModule,
    CartModule,
    SmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
