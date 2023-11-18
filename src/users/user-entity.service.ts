import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserEntityService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<UserDto[]> {
    return await this.databaseService.query<UserDto>('SELECT * FROM users');
  }

  async findOne(username: string): Promise<UserDto | undefined> {
    const result = await this.databaseService.query<UserDto>(
      `SELECT * FROM users WHERE username = '${username}'`,
    );
    return result[0];
  }
}
