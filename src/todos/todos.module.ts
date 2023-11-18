import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { DatabaseService } from 'src/database/database.service';
import { TodosEntityService } from './todos-entity.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodosEntityService, DatabaseService],
})
export class TodosModule {}
