import type { MessagesRecord } from '@/pocketbase-types.gen';

export type MessageType = MessagesRecord;
export type MessageCreateType = Pick<MessageType, 'body' | 'title'>;
export type MessageUpdateType = MessageCreateType;
