import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod/v4-mini';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().check(z.minLength(1)),
    BETTER_AUTH_SECRET: z.string().check(z.minLength(32)),
    WEB_URL: z.url(),
  },
  shared: {
    NODE_ENV: z._default(z.enum(['development', 'production', 'test']), 'development'),
  },
  runtimeEnv: process.env,
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
  emptyStringAsUndefined: true,
});
