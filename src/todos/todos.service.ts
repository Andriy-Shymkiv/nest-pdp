import { Injectable } from '@nestjs/common';
import { CreateTodoDto, TodoDto } from './dto/todo.dto';
import { TodoEntityService } from './todo-entity.service';

@Injectable()
export class TodosService {
  constructor(private readonly todoEntityService: TodoEntityService) {}

  async getAll(userId: string): Promise<TodoDto[]> {
    return this.todoEntityService.getAll(userId);
  }

  async create(data: CreateTodoDto): Promise<TodoDto> {
    return this.todoEntityService.create(data);
  }

  async update(
    id: string,
    title: string,
    completed: boolean,
  ): Promise<TodoDto> {
    return this.todoEntityService.update(id, title, completed);
  }

  async delete(id: string): Promise<boolean> {
    return this.todoEntityService.delete(id);
  }
}
