import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNumberString, IsString } from 'class-validator';

export class TodoDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsBoolean()
  completed: boolean;

  @ApiProperty()
  @IsNumber()
  user_id: string;

  @ApiProperty()
  @IsString()
  created_at: string;
}

export class CreateTodoDto extends OmitType(TodoDto, ['id', 'created_at']) {}

export class UpdateTodoDto extends OmitType(TodoDto, [
  'id',
  'user_id',
  'created_at',
]) {}

export class FindOneParams {
  @IsNumberString()
  id: string;
}

export class FindByUserIdParams {
  @IsNumberString()
  userId: string;
}
