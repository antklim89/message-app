import { createFileRoute } from '@tanstack/react-router';

import { messageListQueryOptions } from '@/entities/messages';
import { MessageListLayout } from '@/pages/home/ui/message-list-layout';
import { MessageNewLayout } from '@/pages/home/ui/message-new-layout';

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
