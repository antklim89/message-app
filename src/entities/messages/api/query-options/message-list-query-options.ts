import { infiniteQueryOptions } from '@tanstack/react-query';

import { MESSAGES_PER_PAGE } from '../../config/constants';
import { getMessageList } from '../repository/get-message-list';

export function messageListQueryOptions({ answerId }: { answerId?: number } = {}) {
  return infiniteQueryOptions({
    queryKey: ['MESSAGES', { answerId }],
    async queryFn({ pageParam: lastId }) {
      const { fail, error, result } = await getMessageList({ answerId, lastId });
      if (fail) throw new Error(error.message);

      return result.items;
    },
    getNextPageParam(data) {
      if (data.length < MESSAGES_PER_PAGE) return undefined;
      return data.at(-1)?.id ?? undefined;
    },
    initialPageParam: undefined as number | undefined,
    select(data) {
      return data.pages.flat();
    },
  });
}
