import type { SerializedEditorState } from '@message-app/rich-text';
import { z } from 'zod/v4-mini';

export const MessageEmbedSchema = z.union([
  z.object({
    type: z.literal('videos'),
    video: z.file(),
  }),

  z.object({
    type: z.literal('images'),
    images: z.array(z.file()),
  }),
  z.object({
    type: z.literal('site'),
    url: z.string(),
  }),
  z.object({
    type: z.literal('youtube'),
    videoId: z.string(),
  }),
  z.object({ type: z.literal('null') }),
]);

export const MessageCreateSchema = z.object({
  body: z.custom<SerializedEditorState>(),
  answerId: z.optional(z.string()),
  embed: MessageEmbedSchema,
});
