import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntityService } from 'src/users/user-entity.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userEntityService: UserEntityService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userEntityService.findOne(username);
    // @todo: add bcrypt
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
