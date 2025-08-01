import { z } from 'zod';

export const MessageEditSchema = z.object({
  title: z.string().min(3).max(400),
  body: z.string().min(3).max(1000),
});
export type MessageEditSchema = z.infer<typeof MessageEditSchema>;
