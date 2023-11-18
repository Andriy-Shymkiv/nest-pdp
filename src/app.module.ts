import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import { DatabaseService } from './database/database.service';
import { TodosModule } from './todos/todos.module';
import { TodosEntityService } from './todos/todos-entity.service';

@Module({
  imports: [ConfigModule, TodosModule],
  controllers: [],
  providers: [DatabaseService, Logger, TodosEntityService],
})
export class AppModule {}
