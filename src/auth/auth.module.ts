import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    // forwardRef // ikkala tomondan foydalanish
    AdminModule,
    UsersModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: "MyVeryVerySecretKey",
      signOptions: { expiresIn: "5h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
