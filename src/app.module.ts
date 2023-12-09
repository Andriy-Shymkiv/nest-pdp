import { Logger, Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import ThrottlerModule, {
  throttlerProvider,
} from './throttler/throttler.module';
import CacheModule from './cache/cache.module';
import { DatabaseService } from './database/database.service';
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
    SeedsModule,
  ],
  controllers: [],
  providers: [DatabaseService, Logger, throttlerProvider],
})
export class AppModule {}
