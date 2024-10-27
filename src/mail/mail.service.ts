import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../users/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.API_URL}:${process.env.PORT}/api/users/activate/${user.activation_link}`;
    console.log(url);

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Stadium App ga xush kelibsiz!',
        template: './confirm',
        context: {
          full_name: user.full_name,
          url,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Email yuborishda xatolik!');
    }
  }
}
