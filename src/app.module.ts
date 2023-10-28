import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [ConfigModule.forRoot({}), TodosModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
