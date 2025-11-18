import { z } from 'zod/v4-mini';

import type { MessageBody } from '@/entities/messages';
import { calculateLexicalTextLength } from '@/shared/lib/lexical';
import { MAX_MESSAGE_BODY_LENGTH, MIN_MESSAGE_BODY_LENGTH } from '../config/constants';

export const MessageCreateSchema = z.object({
  body: z.custom<MessageBody>().check(
    z.refine(v => {
      const textLength = calculateLexicalTextLength(v);
      return textLength <= MAX_MESSAGE_BODY_LENGTH && textLength > MIN_MESSAGE_BODY_LENGTH;
    }, `The text should be between ${MIN_MESSAGE_BODY_LENGTH} and ${MAX_MESSAGE_BODY_LENGTH} characters long.`),
  ),
  files: z.optional(z.array(z.file())),
});
