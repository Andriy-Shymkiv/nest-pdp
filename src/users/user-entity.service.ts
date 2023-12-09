import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UserDto } from './dto/user.dto';

@Injectable()
export class UserEntityService implements OnApplicationBootstrap {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(username: string): Promise<UserDto | undefined> {
    const result = await this.databaseService.query<UserDto>(
      `SELECT * FROM users WHERE username = '${username}'`,
    );
    return result[0];
  }
  async create(data: CreateUserDto): Promise<UserDto> {
    const result = await this.databaseService.query<UserDto>(
      `INSERT INTO users (username, password) VALUES ('${data.username}', '${data.password}') RETURNING *`,
    );
    return result[0];
  }
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    await this.databaseService.query(query);
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.createTable();
  }
}
