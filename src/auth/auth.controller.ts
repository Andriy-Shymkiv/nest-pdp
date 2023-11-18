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
import { CreateUserDto, UserDto } from 'src/users/dto/user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: CreateUserDto): Promise<{ access_token: string }> {
    return this.authService.signIn(body);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return new UserResponseDto(await this.authService.signUp(body));
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(
    @Request()
    req: Request & { user: UserDto },
  ): UserResponseDto {
    return new UserResponseDto(req.user);
  }
}
