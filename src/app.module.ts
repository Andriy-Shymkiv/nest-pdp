import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import { DatabaseService } from './database/database.service';
import { TodosModule } from './todos/todos.module';
import { TodosEntityService } from './todos/todos-entity.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, TodosModule, UsersModule],
  controllers: [],
  providers: [DatabaseService, Logger, TodosEntityService],
})
export class AppModule {}
