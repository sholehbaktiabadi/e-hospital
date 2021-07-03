import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DatabaseType, Env } from './config/env-loader';
import { AuthModule } from './services/user-auth/auth.module';
import { UserAccountModule } from './services/user-account/user-account.module';
import { UserVerificationModule } from './services/user-verification/user-verification.module';
import { UserPinModule } from './services/user-pin/user-pin.module';

@Module({
  imports: [
    AuthModule,
    UserPinModule,
    UserVerificationModule,
    UserAccountModule,
    TypeOrmModule.forRoot({
      type: DatabaseType,
      host: Env().DB_HOST,
      port: Env().DB_PORT,
      username: Env().DB_USER,
      password: Env().DB_PASSWORD,
      database: Env().DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      migrationsTableName: '_schema_migration_history',
      migrationsRun: false,
      migrations: [join(__dirname, '/migrations/*.js')],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
