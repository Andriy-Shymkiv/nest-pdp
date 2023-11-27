import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntityService } from './user-entity.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserEntityService, DatabaseService],
  exports: [UsersService, UserEntityService],
})
export class UsersModule {}
