import { z } from 'zod';

export const env = z
  .object({
    SERVER_URL: z.string().default('/'),
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_URL: z.string(),
  })
  .parse({
    SERVER_URL: import.meta.env.VITE_SERVER_URL,
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  });
