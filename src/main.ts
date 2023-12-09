import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.enableShutdownHooks();
  const PORT = ENV.PORT;
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
