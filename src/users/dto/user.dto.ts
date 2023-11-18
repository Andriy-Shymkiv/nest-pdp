import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @IsString()
  created_at: string;
}

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'created_at',
  'role',
]) {}
