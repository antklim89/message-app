import type { SerializedEditorState } from '@message-app/rich-text';
import type * as z from 'zod/v4-mini';

import type { MessageCreateSchema, MessageEmbedSchema } from './schemas';

export interface MessageType {
  id: string;
  body: SerializedEditorState;
  answerId: string;
  authorId: string;
  createdAt: string;
}

export type MessageCreateType = z.infer<typeof MessageCreateSchema>;

export const EmbedType = {
  VIDEOS: 'videos',
  IMAGES: 'images',
  SITE: 'site',
  YOUTUBE: 'youtube',
  NULL: 'null',
} as const;
export type EmbedType = (typeof EmbedType)[keyof typeof EmbedType];

export type EmbedState = z.infer<typeof MessageEmbedSchema>;
