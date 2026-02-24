import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { getApiPort, getCorsOrigins, requireEnv } from './common/config/env';

async function bootstrap() {
  requireEnv('JWT_SECRET');

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: getCorsOrigins(),
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  await app.listen(getApiPort());
}

void bootstrap();
