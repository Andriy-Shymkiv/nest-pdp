import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ENV } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const PORT = ENV.PORT;
  await app.listen(PORT);
  app.get(Logger).log(`Server running on port ${PORT}`);
}
bootstrap();
