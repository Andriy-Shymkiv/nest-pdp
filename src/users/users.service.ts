import { Injectable } from '@nestjs/common';
import { UserEntityService } from './user-entity.service';
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly userEntityService: UserEntityService) {}
}
