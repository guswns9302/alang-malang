import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonExceptionFilter } from './utils/common.exception.filter';
import { Interceptor } from './utils/common.interceptor';
import { ValidationPipe } from '@nestjs/common';

// import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });

  app.useGlobalInterceptors(new Interceptor());
  app.useGlobalFilters(new CommonExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
