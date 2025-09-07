import { type QueryClient } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';

export function preloadMessagesPage({
  context: { queryClient },
  params: { profileId },
}: {
  context: { queryClient: QueryClient };
  params: { profileId: string };
}) {
  queryClient.ensureInfiniteQueryData(messageListQueryOptions({ authorId: profileId }));
}
