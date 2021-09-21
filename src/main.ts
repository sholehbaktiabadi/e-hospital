import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const PORT = process.env.SERVER_PORT || 3000;
  const host = '0.0.0.0';
  const port = process.env.PORT || 3000;
  app.listen(port, host, function() {
    console.log(`Server started.......${port}`);
  });
  Logger.log('3000');
}
bootstrap();
