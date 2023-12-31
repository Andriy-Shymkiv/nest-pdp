import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import {
  CreateTodoDto,
  UpdateTodoDto,
  TodoDto,
  FindOneParams,
} from './dto/todo.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { AuthGuard } from 'src/auth/auth.guard';
import { AuthRequest } from 'src/auth/common/types';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { UserRole } from 'src/users/dto/user.dto';

@UseGuards(AuthGuard)
@ApiBadRequestResponse()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAll(@Request() { user }: AuthRequest): Promise<TodoDto[]> {
    return this.todosService.getAll(user.id);
  }

  @ApiCreatedResponse({ type: TodoDto })
  @Post()
  async create(
    @Request() { user }: AuthRequest,
    @Body() data: CreateTodoDto,
  ): Promise<TodoDto> {
    return this.todosService.create({
      ...data,
      user_id: user.id,
    });
  }

  @ApiOkResponse({ type: TodoDto })
  @Patch(':id')
  async update(
    @Request() { user }: AuthRequest,
    @Param() { id }: FindOneParams,
    @Body() data: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.todosService.update({
      ...data,
      id: Number(id),
      user_id: user.id,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: Boolean })
  @Delete(':id')
  async delete(
    @Request() { user }: AuthRequest,
    @Param() { id }: FindOneParams,
  ): Promise<boolean> {
    return this.todosService.delete({
      id: Number(id),
      user_id: user.id,
    });
  }
}
