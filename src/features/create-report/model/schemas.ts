import { z } from 'zod/v4-mini';

export const ReportCreateSchema = z.object({
  body: z.string().check(z.maxLength(2000), z.minLength(3)),
  category: z.string().check(z.maxLength(200), z.minLength(3)),
});
