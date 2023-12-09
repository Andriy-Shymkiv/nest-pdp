import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

const THROTTLER_LIFETIME = 60000;
const THROTTLER_LIMIT = 10;

export const throttlerProvider = {
  provide: 'APP_GUARD',
  useClass: ThrottlerGuard,
};

export default ThrottlerModule.forRoot([
  {
    ttl: THROTTLER_LIFETIME,
    limit: THROTTLER_LIMIT,
  },
]);
