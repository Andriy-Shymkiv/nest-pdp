import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
