import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ACCESS_TOKEN_LIFETIME } from './common/constants';
import { ENV } from 'src/config/config.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: ENV.JWT_SECRET,
      signOptions: { expiresIn: ACCESS_TOKEN_LIFETIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
