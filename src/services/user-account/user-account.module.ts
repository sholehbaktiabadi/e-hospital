import { Module } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { UserAccountController } from './user-account.controller';

@Module({
  providers: [UserAccountService],
  controllers: [UserAccountController]
})
export class UserAccountModule {}
