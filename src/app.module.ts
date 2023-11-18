import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import { DatabaseService } from './database/database.service';
import { TodosModule } from './todos/todos.module';
import { TodoEntityService } from './todo-entity/todo-entity.service';

@Module({
  imports: [ConfigModule, TodosModule],
  controllers: [],
  providers: [DatabaseService, Logger, TodoEntityService],
})
export class AppModule {}
