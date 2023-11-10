import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getTodos(userId: string): Promise<TodoDto[]> {
    const query = `
      SELECT * FROM todos WHERE user_id = $1;
    `;
    return await this.databaseService.query(query, [userId]);
  }

  async createTodo(
    title: string,
    completed: boolean,
    userId: string,
  ): Promise<TodoDto> {
    const query = `
      INSERT INTO todos (title, completed, user_id)
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
    // return updated todos ???
  }
}
