import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { messageListQueryOptions } from '../query-options/message-list-query-options';

export function useMessageListQuery(...args: Parameters<typeof messageListQueryOptions>) {
  return useSuspenseInfiniteQuery(messageListQueryOptions(...args));
}
