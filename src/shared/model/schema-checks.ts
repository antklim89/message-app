import { z } from 'zod/v4-mini';

const URL_REGEX = /^(https?:\/\/)?[a-zA-Z0-9.-]{1,256}\.[a-zA-Z]{2,6}$/;
const EMAIL_REGEX = /^mailto:([a-zA-Z0-9._%+-]{1,256}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/;
const LATIN_CHARS_NUMBER_SYMBOL_REGEX = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;

export const checkLatinCharsNumberSymbols = z.regex(
  LATIN_CHARS_NUMBER_SYMBOL_REGEX,
  'Password can contain only latin characters, numbers and symbols.',
);
export const checkLink = z.regex(URL_REGEX, 'Link should look like this https://www.example.com');
export const checkMailLink = z.regex(EMAIL_REGEX, 'Link should look like this mailto:example@mail.com');
