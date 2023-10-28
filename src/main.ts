import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  const PORT = process.env.PORT ?? 8080;
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
