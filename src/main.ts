import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useLogger(app.get(Logger));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(configService.get('PORT'), '0.0.0.0');
}
bootstrap();
