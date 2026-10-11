import type { SerializedEditorState } from '@message-app/rich-text';
import type * as z from 'zod/v4-mini';

import type {
  MessageCreateSchema,
  MessageDraftUpdateSchema,
  MessageEmbedRecordSchema,
  MessageEmbedSchema,
} from './schemas';

export type MessageCreateType = z.infer<typeof MessageCreateSchema>;
export type MessageDraftUpdateType = z.infer<typeof MessageDraftUpdateSchema>;

export const EmbedType = {
  VIDEOS: 'videos',
  IMAGES: 'images',
  SITE: 'site',
  YOUTUBE: 'youtube',
  NULL: 'null',
} as const;
export type EmbedType = (typeof EmbedType)[keyof typeof EmbedType];

export type EmbedStateRecord = z.infer<typeof MessageEmbedRecordSchema>;
export type EmbedState = z.infer<typeof MessageEmbedSchema>;

export interface MessageType {
  id: string;
  body: SerializedEditorState;
  embed?: EmbedState;
  answerId: string;
  authorId: string;
  createdAt: string;
}
