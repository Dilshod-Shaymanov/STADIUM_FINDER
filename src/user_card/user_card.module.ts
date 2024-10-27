import { Module } from '@nestjs/common';
import { UserCardService } from './user_card.service';
import { UserCardController } from './user_card.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCard } from './models/user_card.model';

@Module({
  imports: [SequelizeModule.forFeature([UserCard])],
  controllers: [UserCardController],
  providers: [UserCardService],
})
export class UserCardModule {}
