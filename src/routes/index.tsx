import { Box, Button, Skeleton } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

import { QuerySuspenseErrorBoundary } from '@/components/suspense/query-suspense-error-boundary';
import { SuspenseErrorBoundary } from '@/components/suspense/suspense-error-boundary';
import { useAuthenticated } from '@/features/auth';
import { Message, MessageList, MessageListFallback, NewMessage, useFetchManyMessages } from '@/features/messages';

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
  const user = useAuthenticated();

  if (user == null) return <Box h={30} />;
  return <NewMessage />;
}

function MessageListLayout() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useFetchManyMessages();
  // console.log('🚀 ~ data: \n%o\n', data);

  return (
    <MessageList>
      {data.pages.map(pageData => pageData.map(message => <Message key={message.id} message={message} />))}
      {isFetchingNextPage && <MessageListFallback />}
      {hasNextPage && <Button onClick={() => fetchNextPage()}>Show More</Button>}
    </MessageList>
  );
}
