import type { InfiniteData } from '@tanstack/react-query';
import type { ListResult as ListResultOriginal } from 'pocketbase';

import type { MessagesRecord, UsersRecord } from '@/pocketbase-types.gen';

export type ListResult<T> = Pick<ListResultOriginal<T>, 'items' | 'page' | 'totalPages'>;

export type MessageType = Pick<MessagesRecord, 'id' | 'title' | 'body' | 'answerTo' | 'created'> & {
  author: Pick<UsersRecord, 'id' | 'name' | 'avatar'>;
  likes: {
    count: number;
    hasLiked: boolean;
  };
};
export type MessageCreateType = Pick<MessageType, 'body' | 'title' | 'answerTo'>;
export type MessageUpdateType = Pick<MessageType, 'body' | 'title'>;

export interface FetchManyMessagesQuery {
  return: ListResult<MessageType>;
  error: Error;
  data: InfiniteData<ListResult<MessageType>>;
  key: ['MESSAGES', { answerTo?: string }];
}

export interface FetchOneMessagesQuery {
  return: MessageType;
  error: Error;
  data: MessageType;
  key: ['MESSAGE', string];
}
