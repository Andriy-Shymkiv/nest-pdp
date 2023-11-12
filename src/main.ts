import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const PORT = env().PORT;
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
