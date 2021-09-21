import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const PORT = process.env.SERVER_PORT || 3000;
  await app.listen(3000, () => {
    Logger.log(
      ' -----------------------------------------------',
      'Server Note',
    );
    Logger.log(
      '|                                               |',
      'Server Note',
    );
    Logger.log(
      `|       Server running on port : 3000           |`,
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
