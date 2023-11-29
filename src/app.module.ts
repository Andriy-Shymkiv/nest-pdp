import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import ThrottlerModule, {
  throttlerProvider,
} from './throttler/throttler.module';
import { DatabaseService } from './database/database.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule,
    TodosModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [DatabaseService, Logger, throttlerProvider],
})
export class AppModule {}
