import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './config/env-loader';

async function bootstrap() {
  const { SERVER_PORT } = Env();
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);
}
bootstrap();
