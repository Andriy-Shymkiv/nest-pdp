import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodosEntityService implements OnApplicationBootstrap {
  constructor(private readonly databaseService: DatabaseService) {}
  private readonly tableName = 'todos';

  async onApplicationBootstrap(): Promise<void> {
    await this.createTableIfNotExists();
  }

  async createTableIfNotExists(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    await this.databaseService.query(query);
  }

  async getAll(userId: string): Promise<TodoDto[]> {
    const query = `
      SELECT * FROM todos WHERE user_id = $1;
    `;
    return await this.databaseService.query(query, [userId]);
  }

  async create(
    title: string,
    completed: boolean,
    userId: string,
  ): Promise<TodoDto> {
    const query = `
      INSERT INTO ${this.tableName} (title, completed, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result: TodoDto[] = await this.databaseService.query(query, [
      title,
      completed,
      userId,
    ]);
    return result[0];
  }

  async update(
    id: string,
    title: string,
    completed: boolean,
  ): Promise<TodoDto> {
    const query = `
      UPDATE ${this.tableName}
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

  async delete(id: string): Promise<boolean> {
    const query = `
      DELETE FROM ${this.tableName} WHERE id = $1;
    `;
    await this.databaseService.query(query, [id]);
    return true;
  }
}
