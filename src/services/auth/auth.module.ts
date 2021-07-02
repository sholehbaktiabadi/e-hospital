import { Module } from '@nestjs/common';
import { UserAccountModule } from '../user-account/user-account.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UserAccountModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
