import { Box, Button, Skeleton } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

import { QuerySuspenseErrorBoundary } from '@/components/suspense/query-suspense-error-boundary';
import { SuspenseErrorBoundary } from '@/components/suspense/suspense-error-boundary';
import { Message, MessageList, MessageListFallback, NewMessage, useFetchManyMessages } from '@/features/messages';
import { useUser } from '@/hooks/useUser';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <SuspenseErrorBoundary fallback={<Skeleton h={30} />}>
        <NewMessageLayout />
      </SuspenseErrorBoundary>
      <QuerySuspenseErrorBoundary fallback={<MessageListFallback />}>
        <MessageListLayout />
      </QuerySuspenseErrorBoundary>
    </div>
  );
}

function NewMessageLayout() {
  const user = useUser();

  if (user == null) return <Box h={30} />;
  return <NewMessage />;
}

function MessageListLayout() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useFetchManyMessages();

  return (
    <MessageList>
      {data.pages.map(pageData => pageData.items.map(message => <Message key={message.id} message={message} />))}
      {isFetchingNextPage && <MessageListFallback />}
      {hasNextPage && <Button onClick={() => fetchNextPage()}>Show More</Button>}
    </MessageList>
  );
}
