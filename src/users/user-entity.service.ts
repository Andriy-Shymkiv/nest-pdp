import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserEntityService implements OnApplicationBootstrap {
  constructor(private readonly databaseService: DatabaseService) {}
  async createUsersTable(): Promise<void> {
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
    await this.createUsersTable();
  }
}
