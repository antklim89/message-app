import { z } from 'zod/v4-mini';

export const MessageEditSchema = z.object({
  body: z.string().check(z.minLength(20), z.maxLength(800)),
});
export type MessageEditSchema = z.infer<typeof MessageEditSchema>;
