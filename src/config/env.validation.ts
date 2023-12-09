import { ZodError, z } from 'zod';

export interface ValidatedEnv {
  PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_NAME: string;
  DB_PORT: number;
  JWT_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
}

export function validate(config: Record<string, unknown>): ValidatedEnv {
  const schema = z.object({
    PORT: z.number().default(8080),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.number().default(5432),
    JWT_SECRET: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.number().default(6379),
  });

  try {
    const validatedConfig = schema.parse({
      ...config,
      PORT: Number(config.PORT),
      DB_PORT: Number(config.DB_PORT),
      REDIS_PORT: Number(config.REDIS_PORT),
    });
    return validatedConfig;
  } catch (error: unknown) {
    throw new Error((error as ZodError).message);
  }
}
