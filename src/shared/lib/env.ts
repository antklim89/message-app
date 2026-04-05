import { z } from 'zod/v4-mini';

export const env = z
  .object({
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_URL: z.string(),
  })
  .parse({
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  });
