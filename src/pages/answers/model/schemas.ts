import { z } from 'zod/v4-mini';

export const AnswersPageParamsSchema = z.object({
  answerId: z.string({ error: 'Message id is invalid.' }),
});
