import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAccountModule } from '../user-account/user-account.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UserAccountModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
