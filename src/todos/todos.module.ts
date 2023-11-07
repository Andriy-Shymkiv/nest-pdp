import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, DatabaseService],
})
export class TodosModule {}
