import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import {
  CreateTodoDto,
  UpdateTodoDto,
  TodoDto,
  FindOneParams,
  FindByUserIdParams,
} from './dto/todo.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiBadRequestResponse()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get(':userId')
  async getAll(@Param() { userId }: FindByUserIdParams): Promise<TodoDto[]> {
    return this.todosService.getAll(userId);
  }

  @ApiCreatedResponse({ type: TodoDto })
  @Post()
  async create(@Body() data: CreateTodoDto): Promise<TodoDto> {
    return this.todosService.create(data);
  }

  @ApiOkResponse({ type: TodoDto })
  @Patch(':id')
  async update(
    @Param() { id }: FindOneParams,
    @Body() data: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.todosService.update(id, data.title, data.completed);
  }

  @Delete(':id')
  async delete(@Param() { id }: FindOneParams): Promise<boolean> {
    return this.todosService.delete(id);
  }
}
