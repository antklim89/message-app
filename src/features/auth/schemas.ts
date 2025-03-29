import { z } from 'zod';


export const BaseAuthSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  repeat: z.string(),
});

export const RegisterSchema = BaseAuthSchema.refine(
  data => data.password === data.repeat,
  {
    message: 'Passwords do not match',
    path: ['repeat'],
  },
);

export const LoginSchema = BaseAuthSchema.pick({
  email: true,
  password: true,
});
