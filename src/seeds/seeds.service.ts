import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { CreateTodoDto } from 'src/todos/dto/todo.dto';
import { TodosService } from 'src/todos/todos.service';

@Injectable()
export class SeedsService {
  constructor(
    private readonly authService: AuthService,
    private readonly todoService: TodosService,
  ) {}

  private readonly users: CreateUserDto[] = [
    { username: 'user', password: 'user' },
    { username: 'admin', password: 'admin' },
  ];

  private readonly todos: (CreateTodoDto & { user_id: number })[] = [
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
