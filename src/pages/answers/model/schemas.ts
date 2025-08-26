import { z } from 'zod/v4-mini';

export const AnswersPageParamsSchema = z.object({
  answerId: z.coerce.number({ error: 'Message id is invalid.' }),
});
