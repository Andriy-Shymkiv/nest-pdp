import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService implements OnApplicationBootstrap {
  constructor(private readonly databaseService: DatabaseService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.createTableIfNotExists();
  }

  async createTableIfNotExists(): Promise<void> {
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

  async getTodos(id: string): Promise<TodoDto[]> {
    const query = `
      SELECT * FROM todos WHERE user_id = $1;
    `;
    return await this.databaseService.query(query, [id]);
  }

  async createTodo(
    title: string,
    completed: boolean,
    user_id: number,
  ): Promise<TodoDto> {
    const query = `
      INSERT INTO todos (title, completed, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result: TodoDto[] = await this.databaseService.query(query, [
      title,
      completed,
      user_id,
    ]);
    return result[0];
  }

  async updateTodo(
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
    const result: TodoDto[] = await this.databaseService.query(query, [
      title,
      completed,
      id,
    ]);
    return result[0];
  }

  async deleteTodo(id: string): Promise<void> {
    const query = `
      DELETE FROM todos WHERE id = $1;
    `;
    await this.databaseService.query(query, [id]);
  }
}
