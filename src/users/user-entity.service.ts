import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserDto } from './dto/user.dto';
import { User } from './users.service';

@Injectable()
export class UserEntityService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<UserDto[]> {
    return this.databaseService.query('SELECT * FROM users');
  }

  async findOne(id: string): Promise<User | null> {
    return this.databaseService.query(`SELECT * FROM users WHERE id = '${id}'`);
  }
}
