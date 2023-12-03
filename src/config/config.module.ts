import { ConfigModule } from '@nestjs/config';
import { ValidatedEnv, validate } from './env.validation';

export default ConfigModule.forRoot({
  validate,
  isGlobal: true,
});

export const ENV: ValidatedEnv = validate(process.env);
