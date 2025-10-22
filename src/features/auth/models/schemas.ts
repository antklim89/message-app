import { z } from 'zod/v4-mini';

import { checkLatinCharsNumberSymbols } from '@/shared/model/schema-checks';

export const RegisterSchema = z
  .object({
    email: z.string().check(z.email()),
    repeat: z.string(),
    password: z.string().check(z.minLength(8), z.maxLength(80), checkLatinCharsNumberSymbols),
    username: z.string().check(z.minLength(4), z.maxLength(80), checkLatinCharsNumberSymbols),
  })
  .check(
    z.refine(data => data.password === data.repeat, {
      message: 'Passwords do not match',
      path: ['repeat'],
    }),
  );

export const LoginSchema = z.object({
  email: RegisterSchema.shape.email,
  password: RegisterSchema.shape.password,
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
