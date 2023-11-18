import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserEntityService } from './user-entity.service';
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly userEntityService: UserEntityService) {}

  async getAll(): Promise<UserDto[]> {
    return await this.userEntityService.getAll();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userEntityService.findOne(id);
  }
}
