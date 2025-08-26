import { type QueryClient } from '@tanstack/react-query';

import { messageListQueryOptions, messageQueryOptions } from '@/entities/messages';

export function preloadAnswersPage({
  context: { queryClient },
  params: { answerId },
}: {
  context: { queryClient: QueryClient };
  params: { answerId: number };
}) {
  queryClient.ensureInfiniteQueryData(messageListQueryOptions({ answerId }));
  queryClient.ensureQueryData(messageQueryOptions({ id: answerId }));
}
