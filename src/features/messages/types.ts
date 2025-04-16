import type { MessagesRecord, UsersRecord } from '@/pocketbase-types.gen';

export type MessageType = Pick<MessagesRecord, 'id' | 'title' | 'body' | 'answerTo' | 'created'> & {
  author: Pick<UsersRecord, 'id' | 'name' | 'avatar'>;
};
export type MessageCreateType = Pick<MessageType, 'body' | 'title' | 'answerTo'>;
export type MessageUpdateType = Pick<MessageType, 'body' | 'title'>;
