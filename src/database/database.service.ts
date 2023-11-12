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

  async onApplicationBootstrap(): Promise<void> {
    await this.connect();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.disconnect();
  }
}
