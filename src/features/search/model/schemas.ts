import { z } from 'zod/v4-mini';

export const SearchSchema = z.object({
  search: z.string(),
});
export type SearchSchema = z.infer<typeof SearchSchema>;
