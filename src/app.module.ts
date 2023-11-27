import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import { DatabaseService } from './database/database.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, TodosModule, UsersModule],
  controllers: [],
  providers: [DatabaseService, Logger],
})
export class AppModule {}
