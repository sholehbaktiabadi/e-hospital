import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './services/auth/auth.module';
import { UserAccountModule } from './services/user/user-account/user-account.module';
import { UserMessagerModule } from './services/user-messager/user-messager.module';
import { UserPinModule } from './services/user/user-pin/user-pin.module';
import { DoctorModule } from './services/doctor/doctor.module';
import { Env } from './config/env-loader';
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = Env();
@Module({
  imports: [
    AuthModule,
    DoctorModule,
    UserPinModule,
    UserMessagerModule,
    UserAccountModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
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
