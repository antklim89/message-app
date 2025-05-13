import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { MESSAGES_PER_PAGE } from '../../constants';
import { getManyMessages } from '../../services';
import type { FetchManyMessagesQuery, MessageType } from '../../types';

export function useFetchManyMessages() {
  const params = useParams({ from: '/message/$messageId', shouldThrow: false });
  const messageId = params?.messageId ? Number(params?.messageId) : undefined;

  return useSuspenseInfiniteQuery<
    FetchManyMessagesQuery['return'],
    FetchManyMessagesQuery['error'],
    FetchManyMessagesQuery['data'],
    FetchManyMessagesQuery['key'],
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
      return data.at(-1)?.id;
    },
    initialPageParam: undefined,
  });
}
