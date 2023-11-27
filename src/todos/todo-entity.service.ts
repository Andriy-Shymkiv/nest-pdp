import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTodoDto, TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoEntityService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(userId: string): Promise<TodoDto[]> {
    const query = `
      SELECT * FROM todos WHERE user_id = $1;
    `;
    return this.databaseService.query<TodoDto>(query, [userId]);
  }

  async create({ title, completed, user_id }: CreateTodoDto): Promise<TodoDto> {
    const query = `
      INSERT INTO todos (title, completed, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result: TodoDto[] = await this.databaseService.query<TodoDto>(query, [
      title,
      completed,
      user_id,
    ]);
    return result[0];
  }

  async update(
    id: string,
    title: string,
    completed: boolean,
  ): Promise<TodoDto> {
    const query = `
      UPDATE todos
      SET title = $1, completed = $2
      WHERE id = $3
      RETURNING *;
    `;
    const result: TodoDto[] = await this.databaseService.query<TodoDto>(query, [
      title,
      completed,
      id,
    ]);
    return result[0];
  }

  async delete(id: string): Promise<boolean> {
    const query = `
      DELETE FROM todos WHERE id = $1;
    `;
    try {
      await this.databaseService.query<TodoDto>(query, [id]);
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
