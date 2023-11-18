import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoEntityService } from './todo-entity.service';

@Injectable()
export class TodosService {
  constructor(private readonly todoEntityService: TodoEntityService) {}

  async getAll(userId: string): Promise<TodoDto[]> {
    return await this.todoEntityService.getAll(userId);
  }

  async createTodo(
    title: string,
    completed: boolean,
    userId: string,
  ): Promise<TodoDto> {
    return await this.todoEntityService.create(title, completed, userId);
  }

  async updateTodo(
    id: string,
    title: string,
    completed: boolean,
  ): Promise<TodoDto> {
    return await this.todoEntityService.update(id, title, completed);
  }

  async deleteTodo(id: string): Promise<boolean> {
    return await this.todoEntityService.delete(id);
  }
}
