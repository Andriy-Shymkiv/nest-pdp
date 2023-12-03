import { CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-store';
import { ENV } from 'src/config/config.module';

export default CacheModule.register({
  isGlobal: true,
  store: redisStore,
  host: ENV.REDIS_HOST,
  port: ENV.REDIS_PORT,
});
