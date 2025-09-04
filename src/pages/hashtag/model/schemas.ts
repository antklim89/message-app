import { z } from 'zod/v4-mini';

export const HashtagPageParamsSchema = z.object({
  hashtag: z.string({ error: 'Hashtag is required.' }),
});
