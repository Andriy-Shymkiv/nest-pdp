import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodoEntityService } from './todo-entity.service';

@Injectable()
export class TodosService {
  constructor(private readonly todoEntityService: TodoEntityService) {}

  async getAll(user_id: number): Promise<TodoDto[]> {
    return this.todoEntityService.getAll(user_id);
  }

  async create(data: CreateTodoDto & { user_id: number }): Promise<TodoDto> {
    return this.todoEntityService.create(data);
  }

  async update(
    data: UpdateTodoDto & {
      id: number;
      user_id: number;
    },
  ): Promise<TodoDto> {
    const todo = await this.todoEntityService.getOne(data.id, data.user_id);
    if (!todo) {
      throw new NotFoundException();
    }
    return this.todoEntityService.update(data);
  }

  async delete(data: { id: number; user_id: number }): Promise<boolean> {
    const todo = await this.todoEntityService.getOne(data.id, data.user_id);
    if (!todo) {
      throw new NotFoundException();
    }
    return this.todoEntityService.delete(data);
  }
}
