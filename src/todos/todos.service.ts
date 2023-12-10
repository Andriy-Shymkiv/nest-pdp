import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodoEntityService } from './todo-entity.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { getTodosCacheKey } from './common/helpers';
import { TODOS_CACHE_TTL } from './common/constants';

@Injectable()
export class TodosService {
  constructor(
    private readonly todoEntityService: TodoEntityService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAll(user_id: number): Promise<TodoDto[]> {
    const cacheKey = getTodosCacheKey(user_id);
    const cachedTodos = await this.cacheManager.get<TodoDto[]>(cacheKey);

    if (cachedTodos) {
      return cachedTodos;
    }
    const todos = await this.todoEntityService.getAll(user_id);
    await this.cacheManager.set(cacheKey, todos, {
      ttl: TODOS_CACHE_TTL,
    });
    return todos;
  }

  async create(data: CreateTodoDto & { user_id: number }): Promise<TodoDto> {
    await this.cacheManager.del(getTodosCacheKey(data.user_id));
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
    await this.cacheManager.del(getTodosCacheKey(data.user_id));
    return this.todoEntityService.update(data);
  }

  async delete(data: { id: number; user_id: number }): Promise<boolean> {
    const todo = await this.todoEntityService.getOne(data.id, data.user_id);
    if (!todo) {
      throw new NotFoundException();
    }
    await this.cacheManager.del(getTodosCacheKey(data.user_id));
    return this.todoEntityService.delete(data);
  }
}
