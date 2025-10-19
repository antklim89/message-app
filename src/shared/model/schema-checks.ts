import { z } from 'zod/v4-mini';

export const checkLatinCharsNumberSymbols = z.regex(
  /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
  'Password can contain only latin characters, numbers and symbols.',
);

export const checkLink = z.regex(
  /^(https?:\/\/)?(www\.)?[\w\d-]+\.[\w]{2,}(\/.*)?$/,
  'Link should look like this https://www.example.com',
);
