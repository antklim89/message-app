import { createFileRoute } from '@tanstack/react-router';

import { messageListQueryOptions } from '@/entities/messages';
import { MessageListLayout, MessageNewLayout } from '@/pages/home';

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <MessageNewLayout />
      <MessageListLayout />
    </>
  ),
  loader({ context }) {
    context.queryClient.ensureInfiniteQueryData(messageListQueryOptions());
  },
});
