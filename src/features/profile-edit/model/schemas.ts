import { z } from 'zod/v4-mini';

export const ProfileEditSchema = z.object({
  bio: z.string().check(z.maxLength(5000)),
  username: z.string().check(z.minLength(2), z.maxLength(100)),
});
export type ProfileEditSchema = z.infer<typeof ProfileEditSchema>;
