import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.SERVER_PORT || 3000;
  await app.listen(PORT, () => {
    Logger.log(
      ' -----------------------------------------------',
      'Server Note',
    );
    Logger.log(
      '|                                               |',
      'Server Note',
    );
    Logger.log(
      `|       Server running on port : ${PORT}           |`,
      'Server Note',
    );
    Logger.log(
      '|                                               |',
      'Server Note',
    );
    Logger.log(
      ' -----------------------------------------------',
      'Server Note',
    );
  });
}
bootstrap();
