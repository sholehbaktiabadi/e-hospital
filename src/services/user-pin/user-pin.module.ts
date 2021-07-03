import { Module } from '@nestjs/common';
import { UserPinService } from './user-pin.service';
import { UserPinController } from './user-pin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPin } from './model/user-pin.entity';
import { UserMessagerModule } from '../user-messager/user-messager.module';
import { UserAccountModule } from '../user-account/user-account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPin]),
    UserMessagerModule,
    UserAccountModule,
  ],
  providers: [UserPinService],
  controllers: [UserPinController],
})
export class UserPinModule {}
