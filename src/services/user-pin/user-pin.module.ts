import { Module } from '@nestjs/common';
import { UserPinService } from './user-pin.service';
import { UserPinController } from './user-pin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPin } from './model/user-pin.entity';
import { UserVerificationModule } from '../user-verification/user-verification.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserPin]), UserVerificationModule],
  providers: [UserPinService],
  controllers: [UserPinController],
})
export class UserPinModule {}