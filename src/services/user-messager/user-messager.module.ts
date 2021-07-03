import { Module } from '@nestjs/common';
import { UserMessagerService } from './user-messager.service';

@Module({
  providers: [UserMessagerService],
  exports: [UserMessagerService],
})
export class UserMessagerModule {}
