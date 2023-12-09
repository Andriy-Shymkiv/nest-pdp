import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntityService } from './user-entity.service';
import { CreateUserDto, UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userEntityService: UserEntityService) {}

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.userEntityService.findOne(username);
  }

  async create(data: CreateUserDto): Promise<UserDto> {
    const user = await this.userEntityService.findOne(data.username);
    if (user) {
      throw new ConflictException('user with this username already exists');
    }
    return this.userEntityService.create(data);
  }
}
