import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './config/env-loader';

async function bootstrap() {
  const { SERVER_PORT } = Env();
  const app = await NestFactory.create(AppModule);
  var port = SERVER_PORT || 8800;
  await app.listen(port, "0.0.0.0", function() {
  console.log(`Server running on port :  ${port}`);
  }); 
}
bootstrap();
