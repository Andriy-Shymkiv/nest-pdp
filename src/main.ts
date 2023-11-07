import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT ?? 8080;
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
