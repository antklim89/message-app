import { type InferDataFromTag, infiniteQueryOptions, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import type { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import { messageQueryOptions } from './use-message-query';
import { MESSAGES_PER_PAGE } from '../../config/constants';
import type { MessageType } from '../../models/types';
import { getMessageList } from '../repository/get-message-list';

export const MessageListQueryOptionsBaseKey = 'MESSAGES';
export type MessageListQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof messageListQueryOptions>['queryFn'],
  ReturnType<typeof messageListQueryOptions>['queryKey']
>;

export function messageListQueryOptions({
  answerId,
  search,
  isFavorites,
  embeddedType,
  authorId,
}: {
  answerId?: string;
  search?: string;
  isFavorites?: boolean;
  embeddedType?: MessageEmbeddedType;
  authorId?: MessageType['authorId'];
} = {}) {
  return infiniteQueryOptions({
    queryKey: [MessageListQueryOptionsBaseKey, { answerId, search, isFavorites, authorId, embeddedType }],
    getNextPageParam(data: MessageType[]) {
      if (data.length < MESSAGES_PER_PAGE) return;
      return data.at(-1)?.id ?? undefined;
    },
    initialPageParam: undefined as string | undefined,
    async queryFn({ client, pageParam: lastId }) {
      const { fail, error, result } = await getMessageList({
        answerId,
        lastId,
        search,
        isFavorites,
        authorId,
        embeddedType,
      });
      if (fail) throw error;

      result.items.flat().forEach(message => {
        client.setQueryData(messageQueryOptions({ id: message.id }).queryKey, message);
      });

      return result.items;
    },
    select(data) {
      return data.pages.flat();
    },
  });
}

export function useMessageListQuery(...args: Parameters<typeof messageListQueryOptions>) {
  return useSuspenseInfiniteQuery(messageListQueryOptions(...args));
}
