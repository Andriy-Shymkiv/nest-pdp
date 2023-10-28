import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  private pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    });
  }

  async connect(): Promise<void> {
    try {
      await this.pool.connect();
      this.logger.log('Connected to database');
    } catch (error) {
      this.logger.error('Error connecting to database:', error);
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
  }

  async query(query: string, params?: any[]): Promise<any> {
    try {
      const result = await this.pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error);
    }
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.connect();
    await this.createTablesIfNotExist();
  }

  private async createTablesIfNotExist(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN NOT NULL DEFAULT false,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await this.query(query);
  }
}
