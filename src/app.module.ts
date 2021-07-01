import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseType, Env } from './config/env-loader';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: DatabaseType,
      host: Env().DB_HOST,
      port: Env().DB_PORT,
      username: Env().DB_USER,
      password: Env().DB_PASSWORD,
      database: Env().DB_NAME,
      autoLoadEntities: true,
      migrationsRun: true,
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
