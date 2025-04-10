import { z } from 'zod';

export const env = z
  .object({
    SERVER_URL: z.string().default('/'),
  })
  .parse({
    SERVER_URL: import.meta.env.VITE_SERVER_URL,
  });
