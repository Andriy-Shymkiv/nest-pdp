import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { AuthRequest } from './common/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return new UserResponseDto(await this.authService.register(body));
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: CreateUserDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(
    @Request()
    req: AuthRequest,
  ): UserResponseDto {
    return new UserResponseDto(req.user);
  }
}
