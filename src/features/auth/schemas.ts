import { z } from 'zod';

export const BaseAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  repeat: z.string(),
  username: z.string().min(2),
});

export const RegisterSchema = BaseAuthSchema.refine(data => data.password === data.repeat, {
  message: 'Passwords do not match',
  path: ['repeat'],
});
export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = BaseAuthSchema.pick({
  email: true,
  password: true,
});
export type LoginSchema = z.infer<typeof LoginSchema>;
