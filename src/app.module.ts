import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, TodosModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
