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
import { TodoDto } from './dto/todo.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiBadRequestResponse({ description: 'Bad request' })
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get(':userId')
  async getTodos(@Param('userId') userId: string) {
    return await this.todosService.getTodos(userId);
  }

  @ApiCreatedResponse({ type: TodoDto })
  @Post()
  async createTodo(
    @Body() data: Pick<TodoDto, 'title' | 'completed' | 'user_id'>,
  ) {
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
    @Param('id') id: string,
    @Body() data: Pick<TodoDto, 'title' | 'completed'>,
  ) {
    return await this.todosService.updateTodo(id, data.title, data.completed);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return await this.todosService.deleteTodo(id);
  }
}
