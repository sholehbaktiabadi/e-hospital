import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DatabaseType, Env } from './config/env-loader';
import { AuthModule } from './services/auth/auth.module';
import { UserAccountModule } from './services/user-account/user-account.module';
import { UserVerificationModule } from './services/user-verification/user-verification.module';

@Module({
  imports: [
    AuthModule,
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
      synchronize: false,
      logging: true,
      migrationsTableName: '_schema_migration_history',
      migrationsRun: true,
      migrations: [join(__dirname, '/migrations/*.js')],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
