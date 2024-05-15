import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Interceptor } from './utils/common.interceptor';
import { CommonExceptionFilter } from './utils/common.exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('ejs');

  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new Interceptor());
  app.useGlobalFilters(new CommonExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
