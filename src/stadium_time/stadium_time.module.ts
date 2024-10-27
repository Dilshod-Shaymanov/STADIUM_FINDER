import { Module } from '@nestjs/common';
import { StadiumTimeService } from './stadium_time.service';
import { StadiumTimeController } from './stadium_time.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StadiumTime } from './models/stadium_time.model';

@Module({
  imports: [SequelizeModule.forFeature([StadiumTime])],
  controllers: [StadiumTimeController],
  providers: [StadiumTimeService],
})
export class StadiumTimeModule {}
