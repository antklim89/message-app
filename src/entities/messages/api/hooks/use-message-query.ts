import { useSuspenseQuery } from '@tanstack/react-query';

import { messageQueryOptions } from '../query-options/message-query-options';

export function useMessageQuery(...args: Parameters<typeof messageQueryOptions>) {
  return useSuspenseQuery(messageQueryOptions(...args));
}
