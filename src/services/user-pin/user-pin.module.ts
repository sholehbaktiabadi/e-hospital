import { Module } from '@nestjs/common';
import { UserPinService } from './user-pin.service';
import { UserPinController } from './user-pin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPin } from './model/user-pin.entity';
import { UserMessagerModule } from '../user-messager/user-messager.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserPin]), UserMessagerModule],
  providers: [UserPinService],
  controllers: [UserPinController],
})
export class UserPinModule {}
