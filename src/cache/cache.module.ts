import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ENV } from 'src/config/config.module';
import ConfigModule from 'src/config/config.module';

export default CacheModule.register({
  isGlobal: true,
  imports: [ConfigModule],
  store: redisStore,
  host: ENV.REDIS_HOST,
  port: ENV.REDIS_PORT,
});
