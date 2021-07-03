import { forwardRef, Module } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { UserAccountController } from './user-account.controller';
import { AuthModule } from '../user-auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user-account.entity';
import { UserVerificationModule } from '../user-verification/user-verification.module';

@Module({
  imports: [
    UserVerificationModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserAccountService],
  controllers: [UserAccountController],
  exports: [UserAccountService],
})
export class UserAccountModule {}
