import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TodoDto } from './dto/todo.dto';
import {
  CreateTodoInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from './common/types';
import { TODO_DEFAULT_COMPLETED } from './common/constants';

@Injectable()
export class TodoEntityService implements OnApplicationBootstrap {
  constructor(private readonly databaseService: DatabaseService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.createTable();
  }

  async getOne(id: number, user_id: number): Promise<TodoDto> {
    const query = `
      SELECT * FROM todos WHERE id = $1 AND user_id = $2;
    `;
    const result: TodoDto[] = await this.databaseService.query<TodoDto>(query, [
      id,
      user_id,
    ]);
    return result[0];
  }

  async getAll(user_id: number): Promise<TodoDto[]> {
    const query = `
      SELECT * FROM todos WHERE user_id = $1;
    `;
    return this.databaseService.query<TodoDto>(query, [user_id]);
  }

  async create({ title, user_id }: CreateTodoInput): Promise<TodoDto> {
    const query = `
      INSERT INTO todos (title, completed, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result: TodoDto[] = await this.databaseService.query<TodoDto>(query, [
      title,
      TODO_DEFAULT_COMPLETED,
      user_id,
    ]);
    return result[0];
  }

  async update({
    title,
    completed,
    id,
    user_id,
  }: UpdateTodoInput): Promise<TodoDto> {
    const query = `
      UPDATE todos
      SET title = $1, completed = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *;
    `;
    const result: TodoDto[] = await this.databaseService.query<TodoDto>(query, [
      title,
      completed,
      id,
      user_id,
    ]);
    return result[0];
  }

  async delete({ id, user_id }: DeleteTodoInput): Promise<boolean> {
    const query = `
      DELETE FROM todos WHERE id = $1 AND user_id = $2;
    `;
    try {
      await this.databaseService.query<TodoDto>(query, [id, user_id]);
      return true;
    } catch {
      return false;
    }
  }

  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    await this.databaseService.query(query);
  }
}
