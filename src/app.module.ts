import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import { DatabaseService } from './database/database.service';
import { TodosModule } from './todos/todos.module';
import { TodoEntityService } from './todos/todo-entity.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, TodosModule, UsersModule],
  controllers: [],
  providers: [DatabaseService, Logger, TodoEntityService],
})
export class AppModule {}
