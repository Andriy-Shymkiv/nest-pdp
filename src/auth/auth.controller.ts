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

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async registration(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return new UserResponseDto(await this.authService.register(body));
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: CreateUserDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  // will it be enough to do `@UseGuards(AuthGuard, RolesGuard)`?
  // or need to register both of them at the module/controller level?
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(
    @Request()
    req: Request & { user: UserDto },
  ): UserResponseDto {
    return new UserResponseDto(req.user);
  }
}
