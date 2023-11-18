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
  async getTodos(@Param() { userId }: FindByUserIdParams): Promise<TodoDto[]> {
    return await this.todosService.getAll(userId);
  }

  @ApiCreatedResponse({ type: TodoDto })
  @Post()
  async createTodo(@Body() data: CreateTodoDto): Promise<TodoDto> {
    return await this.todosService.createTodo(
      data.title,
      data.completed,
      // @todo: take user_id from request
      data.user_id,
    );
  }

  @ApiOkResponse({ type: TodoDto })
  @Patch(':id')
  async updateTodo(
    @Param() { id }: FindOneParams,
    @Body() data: UpdateTodoDto,
  ): Promise<TodoDto> {
    return await this.todosService.updateTodo(id, data.title, data.completed);
  }

  @Delete(':id')
  async deleteTodo(@Param() { id }: FindOneParams): Promise<boolean> {
    return await this.todosService.deleteTodo(id);
  }
}
