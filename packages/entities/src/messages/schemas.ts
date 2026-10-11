import type { SerializedEditorState } from '@message-app/rich-text';
import { z } from 'zod/v4-mini';

export const MessageEmbedRecordSchema = z.object({
  images: z.object({
    type: z.literal('images'),
    imagesSrc: z.array(z.string()),
  }),
  videos: z.object({
    type: z.literal('videos'),
    videoSrc: z.nullable(z.string()),
  }),
  site: z.object({
    type: z.literal('site'),
    url: z.string(),
  }),
  youtube: z.object({
    type: z.literal('youtube'),
    videoId: z.string(),
  }),
  null: z.object({ type: z.literal('null') }),
});
export const MessageEmbedSchema = z.union([
  MessageEmbedRecordSchema.shape.videos,
  MessageEmbedRecordSchema.shape.images,
  MessageEmbedRecordSchema.shape.site,
  MessageEmbedRecordSchema.shape.youtube,
  MessageEmbedRecordSchema.shape.null,
]);

export const MessageCreateSchema = z.object({
  body: z.custom<SerializedEditorState>(),
  answerId: z.optional(z.string()),
  embed: z.optional(MessageEmbedSchema),
});

export const MessageDraftUpdateSchema = z.object({
  body: z.custom<SerializedEditorState>(),
});
