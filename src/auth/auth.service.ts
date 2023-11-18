import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ username, password }: CreateUserDto): Promise<{
    access_token: string;
  }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync({ payload }),
    };
  }

  async register({ username, password }: CreateUserDto): Promise<UserDto> {
    const hash = bcrypt.hashSync(password, password.length);
    return await this.usersService.create({
      username,
      password: hash,
    });
  }
}
