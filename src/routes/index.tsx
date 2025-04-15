import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { ReactQueryErrorBoundary } from '@/components/error/react-query-error-boundary';
import { Message, MessageList, MessageListFallback, NewMessage, useFetchManyMessages } from '@/features/messages';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <NewMessage />
      <ReactQueryErrorBoundary>
        <Suspense fallback={<MessageListFallback />}>
          <MessageListLayout />
        </Suspense>
      </ReactQueryErrorBoundary>
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
