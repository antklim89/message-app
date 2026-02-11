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

const BodySchema = z.optional(
  z.custom<MessageBody>().check(
    z.refine(v => {
      const textLength = calculateLexicalTextLength(v);
      return textLength <= MAX_MESSAGE_BODY_LENGTH && textLength > MIN_MESSAGE_BODY_LENGTH;
    }, `The text should be between ${MIN_MESSAGE_BODY_LENGTH} and ${MAX_MESSAGE_BODY_LENGTH} characters long.`),
  ),
);
export const MessageCreateSchema = z.union([
  z.object({
    body: BodySchema,
    embeddedType: z.literal(undefined),
  }),
  z.object({
    body: BodySchema,
    embeddedVideos: z.optional(z.array(z.file()).check(z.maxLength(MAX_UPLOADED_VIDEOS))),
    embeddedType: z.literal(MessageEmbeddedType.VIDEOS),
  }),
  z.object({
    body: BodySchema,
    embeddedImages: z.optional(z.array(z.file()).check(z.maxLength(MAX_UPLOADED_IMAGES))),
    embeddedType: z.literal(MessageEmbeddedType.IMAGES),
  }),
  z.object({
    body: BodySchema,
    embeddedLink: z.string().check(z.url()),
    embeddedType: z.literal(MessageEmbeddedType.LINK),
  }),
]);
