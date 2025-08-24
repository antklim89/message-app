import { z } from 'zod/v4-mini';

export const RegisterSchema = z
  .object({
    email: z.string().check(z.email()),
    repeat: z.string(),
    password: z.string().check(
      z.minLength(8, {
        error: ({ minimum, input }) => `Field password should have ${minimum} characters. Now is ${input?.length ?? 0}`,
      }),
      z.regex(/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, {
        error: 'Password can contain only latin characters, numbers and symbols.',
      }),
    ),
    username: z.string().check(
      z.regex(/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, {
        error: 'Password can contain only latin characters, numbers and symbols.',
      }),
      z.minLength(4, {
        error: ({ minimum, input }) => `Field password should have ${minimum} characters. Now is ${input?.length ?? 0}`,
      }),
    ),
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
