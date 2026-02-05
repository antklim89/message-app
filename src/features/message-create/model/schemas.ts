import { z } from 'zod/v4-mini';

import type { MessageBody } from '@/entities/messages';
import { calculateLexicalTextLength } from '@/shared/lib/lexical';
import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import {
  MAX_MESSAGE_BODY_LENGTH,
  MAX_UPLOADED_IMAGES,
  MAX_UPLOADED_VIDEOS,
  MIN_MESSAGE_BODY_LENGTH,
} from '../config/constants';

export const MessageCreateSchema = z.object({
  body: z.optional(
    z.custom<MessageBody>().check(
      z.refine(v => {
        const textLength = calculateLexicalTextLength(v);
        return textLength <= MAX_MESSAGE_BODY_LENGTH && textLength > MIN_MESSAGE_BODY_LENGTH;
      }, `The text should be between ${MIN_MESSAGE_BODY_LENGTH} and ${MAX_MESSAGE_BODY_LENGTH} characters long.`),
    ),
  ),
  embedded: z.optional(
    z.union([
      z.object({
        type: z.literal(MessageEmbeddedType.IMAGES),
        files: z.optional(z.array(z.file()).check(z.maxLength(MAX_UPLOADED_IMAGES))),
      }),
      z.object({
        type: z.literal(MessageEmbeddedType.VIDEOS),
        files: z.optional(z.array(z.file()).check(z.maxLength(MAX_UPLOADED_VIDEOS))),
      }),
    ]),
  ),
});
