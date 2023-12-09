import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, TodosModule, UsersModule, AuthModule, DatabaseModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
