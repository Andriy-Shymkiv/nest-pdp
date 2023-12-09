import { ApiProperty } from '@nestjs/swagger';
import { UserDto, UserRole } from './user.dto';
import { Exclude } from 'class-transformer';

export class UserResponseDto implements UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  created_at: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
