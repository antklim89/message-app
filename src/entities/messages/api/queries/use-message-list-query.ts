import { type InferDataFromTag, infiniteQueryOptions, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { messageQueryOptions } from './use-message-query';
import { MESSAGES_PER_PAGE } from '../../config/constants';
import { type MessageType } from '../../models/types';
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
}: {
  answerId?: number;
  search?: string;
  isFavorites?: boolean;
} = {}) {
  return infiniteQueryOptions({
    queryKey: [MessageListQueryOptionsBaseKey, { answerId, search, isFavorites }],
    getNextPageParam(data: MessageType[]) {
      if (data.length < MESSAGES_PER_PAGE) return;
      return data.at(-1)?.id ?? undefined;
    },
    initialPageParam: undefined as number | undefined,
    async queryFn({ client, pageParam: lastId }) {
      const { fail, error, result } = await getMessageList({ answerId, lastId, search, isFavorites });
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
