import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { TodosService } from 'src/todos/todos.service';
import { TodoEntityService } from 'src/todos/todo-entity.service';

@Module({
  imports: [UsersModule],
  providers: [SeedsService, AuthService, TodosService, TodoEntityService],
})
export class SeedsModule {}
