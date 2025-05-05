import type { InfiniteData } from '@tanstack/react-query';

import type { UserType } from '@/features/auth';

export type MessageType = {
  answerToId?: number | null;
  authorId: string;
  body: string;
  created: string;
  id: number;
  title: string;
  author: UserType;
  hasLiked: boolean | null;
  likesCount: number | null;
};

export type MessageCreateType = Pick<MessageType, 'body' | 'title' | 'answerToId'>;
export type MessageUpdateType = Pick<MessageType, 'body' | 'title'>;

export interface FetchManyMessagesQuery {
  return: MessageType[];
  error: Error;
  data: InfiniteData<MessageType[]>;
  key: ['MESSAGES', { answerTo?: MessageType['id'] }];
}

export interface FetchOneMessagesQuery {
  return: MessageType;
  error: Error;
  data: MessageType;
  key: ['MESSAGE', MessageType['id']];
}
