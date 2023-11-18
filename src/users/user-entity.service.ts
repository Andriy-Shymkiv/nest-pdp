import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UserDto } from './dto/user.dto';

@Injectable()
export class UserEntityService {
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
}
