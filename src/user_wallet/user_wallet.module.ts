import { Module } from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { UserWalletController } from './user_wallet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserWallet } from './models/user_wallet.model';

@Module({
  imports: [SequelizeModule.forFeature([UserWallet])],
  controllers: [UserWalletController],
  providers: [UserWalletService],
})
export class UserWalletModule {}
