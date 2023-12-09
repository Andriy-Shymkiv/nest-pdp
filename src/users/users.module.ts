import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntityService } from './user-entity.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserEntityService],
  exports: [UsersService, UserEntityService],
})
export class UsersModule {}
