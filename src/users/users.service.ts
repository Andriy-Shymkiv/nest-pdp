import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import query from 'src/common/query';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers(): Promise<User[]> {
    return this.databaseService.query(query.users.findMany);
  }

  async findOne(username: string): Promise<User | undefined> {
    const users = await this.databaseService.query(query.users.findOneByName, [
      username,
    ]);
    return users[0];
  }
}
