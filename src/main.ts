import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const PORT = process.env.SERVER_PORT || 3000;
  await app.listen(3000, '0.0.0.0');
  Logger.log('3000');
}
bootstrap();
