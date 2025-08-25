import { z } from 'zod/v4-mini';

export const checkLatinCharsNumberSymbols = z.regex(/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, {
  error: 'Password can contain only latin characters, numbers and symbols.',
});
