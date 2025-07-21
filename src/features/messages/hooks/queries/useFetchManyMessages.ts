import { type InferDataFromTag, infiniteQueryOptions, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { MESSAGES_PER_PAGE } from '../../constants';
import { getManyMessages } from '../../services';
import type { MessageType } from '../../types';

export function fetchManyMessagesQueryOptions(messageId?: number) {
  return infiniteQueryOptions<
    MessageType[],
    Error,
    MessageType[],
    ['MESSAGES', { answerTo?: MessageType['id'] }],
    MessageType['id'] | undefined
  >({
    queryKey: ['MESSAGES', { answerTo: messageId }],
    async queryFn({ pageParam: lastId }) {
      const { fail, error, result } = await getManyMessages({ answerTo: messageId, lastId });
      if (fail) throw new Error(error.message);

      return result.items;
    },
    getNextPageParam(data) {
      if (data.length < MESSAGES_PER_PAGE) return undefined;
      return data.at(-1)?.id ?? undefined;
    },
    initialPageParam: undefined,
    select(data) {
      return data.pages.flat();
    },
  });
}

export type FetchManyMessagesQueryKey = ReturnType<typeof fetchManyMessagesQueryOptions>['queryKey'];

export type FetchManyMessagesQueryReturn = InferDataFromTag<
  ReturnType<typeof fetchManyMessagesQueryOptions>['queryFn'],
  FetchManyMessagesQueryKey
>;

export function useFetchManyMessages() {
  const params = useParams({ from: '/message/$messageId', shouldThrow: false });
  const messageId = params?.messageId ? Number(params?.messageId) : undefined;

  return useSuspenseInfiniteQuery(fetchManyMessagesQueryOptions(messageId));
}
