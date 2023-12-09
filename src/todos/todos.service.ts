import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoEntityService } from './todo-entity.service';
import {
  CreateTodoInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from './common/types';

@Injectable()
export class TodosService {
  constructor(private readonly todoEntityService: TodoEntityService) {}

  async getAll(user_id: number): Promise<TodoDto[]> {
    return this.todoEntityService.getAll(user_id);
  }

  async create(data: CreateTodoInput): Promise<TodoDto> {
    return this.todoEntityService.create(data);
  }

  async update(data: UpdateTodoInput): Promise<TodoDto> {
    return this.todoEntityService.update(data);
  }

  async delete(data: DeleteTodoInput): Promise<boolean> {
    return this.todoEntityService.delete(data);
  }
}
