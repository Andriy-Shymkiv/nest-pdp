import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { DatabaseService } from 'src/database/database.service';
import { TodoEntityService } from './todo-entity.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, DatabaseService, TodoEntityService],
})
export class TodosModule {}
