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
  user_id: number;

  @ApiProperty()
  @IsString()
  created_at: string;
}

export class CreateTodoDto extends OmitType(TodoDto, [
  'id',
  'created_at',
  'completed',
  'user_id',
]) {}

export class UpdateTodoDto extends OmitType(TodoDto, [
  'id',
  'created_at',
  'user_id',
]) {}

export class FindOneParams {
  @IsNumberString()
  id: string;
}
