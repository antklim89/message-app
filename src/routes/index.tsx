import { createFileRoute } from '@tanstack/react-router';

import { QuerySuspenseErrorBoundary } from '@/components/suspense/query-suspense-error-boundary';
import { Message, MessageList, MessageListFallback, NewMessage, useFetchManyMessages } from '@/features/messages';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <NewMessage />
      <QuerySuspenseErrorBoundary fallback={<MessageListFallback />}>
        <MessageListLayout />
      </QuerySuspenseErrorBoundary>
    </div>
  );
}

function MessageListLayout() {
  const { data } = useFetchManyMessages();

  return (
    <MessageList>
      {data.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </MessageList>
  );
}
