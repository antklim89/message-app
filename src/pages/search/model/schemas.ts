import { z } from 'zod/v4-mini';

export const SearchPageParamsSchema = z.object({
  s: z._default(z.string(), ''),
});
