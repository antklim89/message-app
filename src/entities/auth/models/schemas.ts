import { z } from 'zod/v4-mini';

export const BaseAuthSchema = z.object({
  email: z.string().check(z.email()),
  password: z.string().check(z.minLength(1)),
  repeat: z.string(),
  username: z.string().check(z.minLength(2)),
});

export const RegisterSchema = BaseAuthSchema.check(
  z.refine(data => data.password === data.repeat, {
    message: 'Passwords do not match',
    path: ['repeat'],
  }),
);

export const LoginSchema = z.object({
  email: BaseAuthSchema.shape.email,
  password: BaseAuthSchema.shape.password,
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
