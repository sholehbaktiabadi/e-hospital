import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DatabaseType, Env } from './config/env-loader';
import { AuthModule } from './services/user-auth/auth.module';
import { UserAccountModule } from './services/user-account/user-account.module';
import { UserMessagerModule } from './services/user-messager/user-messager.module';
import { UserPinModule } from './services/user-pin/user-pin.module';
import { DoctorModule } from './services/doctor/doctor.module';

@Module({
  imports: [
    AuthModule,
    DoctorModule,
    UserPinModule,
    UserMessagerModule,
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
