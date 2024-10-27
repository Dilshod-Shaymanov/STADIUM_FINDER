import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { BotModule } from '../bot/bot.module';
import { Bot } from '../bot/models/bot.model';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/models/otp.model';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Bot, Otp]),
    JwtModule.register({}),
    MailModule,
    BotModule,
    OtpModule,
    SmsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
