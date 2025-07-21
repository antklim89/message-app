import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getOneMessage } from '../../services';
import type { MessageType } from '../../types';

export function fetchOneMessageQueryOptions({ id }: { id: MessageType['id'] }) {
  return queryOptions({
    queryKey: ['MESSAGE', id] as const,
    async queryFn() {
      const { fail, error, result } = await getOneMessage(id);
      if (fail) throw new Error(error.message);
      return result;
    },
  });
}

export function useFetchOneMessage({ id }: { id: MessageType['id'] }) {
  return useSuspenseQuery(fetchOneMessageQueryOptions({ id }));
}
