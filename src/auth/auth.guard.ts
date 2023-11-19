import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from 'src/common/roles.decorator';
import { env } from 'src/config/env.validation';
import { UserRole } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const secret = env().JWT_SECRET;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      const user = await this.userService.findOne(payload.payload.username);
      // 💡 We're assigning the user to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;

      // @todo: move to RolesGuard ???
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      return requiredRoles
        ? requiredRoles.some((role) => user?.role.includes(role))
        : true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
