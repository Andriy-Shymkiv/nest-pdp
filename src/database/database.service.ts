import {
  Injectable,
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
  }

  async onApplicationShutdown(): Promise<void> {
    await this.disconnect();
  }
}
