import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ENV } from './config/config.module';
// import { SeedsService } from './seeds/seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();

  // const seedsService = app.get(SeedsService);
  // await seedsService.seedUsers();

  const PORT = ENV.PORT;
  await app.listen(PORT);
  app.get(Logger).log(`Server running on port ${PORT}`);
}
bootstrap();
