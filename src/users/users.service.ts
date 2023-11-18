import { Injectable } from '@nestjs/common';
import { UserEntityService } from './user-entity.service';

@Injectable()
export class UsersService {
  constructor(private readonly userEntityService: UserEntityService) {}

  async getOne(username: string) {
    return await this.userEntityService.findOne(username);
  }
}
