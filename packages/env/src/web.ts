import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod/v4-mini';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_SERVER_URL: z.url(),
  },
  shared: {
    NODE_ENV: z._default(z.enum(['development', 'production', 'test']), 'development'),
  },
  runtimeEnv: {
    VITE_SERVER_URL: import.meta.env.VITE_SERVER_URL,
    NODE_ENV: import.meta.env.NODE_ENV,
  },
  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});
