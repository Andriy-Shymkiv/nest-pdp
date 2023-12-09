import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import ThrottlerModule, {
  throttlerProvider,
} from './throttler/throttler.module';
import CacheModule from './cache/cache.module';
import { DatabaseModule } from './database/database.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule,
    CacheModule,
    TodosModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [Logger, throttlerProvider],
})
export class AppModule {}
