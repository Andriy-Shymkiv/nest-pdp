import { Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { UserDto, UserRole } from 'src/users/dto/user.dto';
import { TodoDto } from 'src/todos/dto/todo.dto';
import { TodosService } from 'src/todos/todos.service';

class SeedUserDto extends OmitType(UserDto, ['id', 'created_at']) {}
class SeedTodoDto extends OmitType(TodoDto, [
  'id',
  'created_at',
  'completed',
]) {}

@Injectable()
export class SeedsService {
  constructor(
    private readonly authService: AuthService,
    private readonly todoService: TodosService,
  ) {}

  private readonly users: SeedUserDto[] = [
    { username: 'user', password: 'user', role: UserRole.USER },
    { username: 'admin', password: 'admin', role: UserRole.ADMIN },
  ];

  private readonly todos: SeedTodoDto[] = [
    { title: 'Buy groceries', user_id: 1 },
    { title: 'Do laundry', user_id: 1 },
    { title: 'Clean room', user_id: 1 },
    { title: 'Buy groceries', user_id: 2 },
    { title: 'Do laundry', user_id: 2 },
    { title: 'Clean room', user_id: 2 },
  ];
  async seedUsers() {
    try {
      for (const user of this.users) {
        await this.authService.register(user);
      }
      console.log('users seeded');
    } catch (error) {
      console.log(error);
    }
  }
  async seedTodos() {
    try {
      for (const todo of this.todos) {
        await this.todoService.create(todo);
      }
      console.log('todos seeded');
    } catch (error) {
      console.log(error);
    }
  }
  async seedAll() {
    await this.seedUsers();
    await this.seedTodos();
  }
}
