import { CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-store';
import { env } from 'src/config/env.validation';

export default CacheModule.register({
  isGlobal: true,
  store: redisStore,
  host: env().REDIS_HOST,
  port: env().REDIS_PORT,
});
