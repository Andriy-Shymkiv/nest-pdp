import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({}), TodosModule, AuthModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
