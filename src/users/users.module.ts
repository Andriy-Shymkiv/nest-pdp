import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseService } from 'src/database/database.service';
import { UserEntityService } from './user-entity.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserEntityService, DatabaseService],
})
export class UsersModule {}
