import { Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
