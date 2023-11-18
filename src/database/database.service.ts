import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Pool } from 'pg';
import { env } from 'src/config/env.validation';

@Injectable()
export class DatabaseService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    this.pool = new Pool({
      user: env().DB_USER,
      host: env().DB_HOST,
      database: env().DB_NAME,
      port: env().DB_PORT,
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
    try {
      await this.pool.end();
      this.logger.log('Disconnected from database');
    } catch (error) {
      this.logger.error('Error disconnecting from database:', error);
    }
  }

  async query<T = any>(query: string, params?: any[]): Promise<T[]> {
    try {
      const result = await this.pool.query(query, params);
      return result.rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // generic error
        throw new InternalServerErrorException(error.message);
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error
      ) {
        // postgresql error
        throw new BadRequestException(
          `Error code: ${(error as { code: string }).code}`,
        );
      } else {
        // unexpected error
        throw new InternalServerErrorException();
      }
    }
  }

  // should I create a separate service for creating tables?
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
    await this.query(query);
  }
  async createTodosTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    await this.query(query);
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.connect();
    await this.createUsersTable();
    await this.createTodosTable();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.disconnect();
  }
}
