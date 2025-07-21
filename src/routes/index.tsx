// import { Box, Button, Skeleton } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

// import { QuerySuspenseErrorBoundary } from '@/components/suspense/query-suspense-error-boundary';
// import { SuspenseErrorBoundary } from '@/components/suspense/suspense-error-boundary';
// import { useUser } from '@/features/auth';
// import { Message, MessageList, MessageListFallback, NewMessage, useFetchManyMessages } from '@/features/messages';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      {/* <SuspenseErrorBoundary fallback={<Skeleton h={30} />}>
        <NewMessageLayout />
      </SuspenseErrorBoundary>
      <QuerySuspenseErrorBoundary fallback={<MessageListFallback />}>
        <MessageListLayout />
      </QuerySuspenseErrorBoundary> */}
      Not Implemented
    </div>
  );
}

// function NewMessageLayout() {
//   const user = useUser();

//   if (user) return <NewMessage />;
//   return <Box h={30} />;
// }

// function MessageListLayout() {
//   const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useFetchManyMessages();

//   return (
//     <MessageList>
//       {data.map(message => (
//         <Message key={message.id} message={message} />
//       ))}
//       {isFetchingNextPage && <MessageListFallback />}
//       {hasNextPage && <Button onClick={() => fetchNextPage()}>Show More</Button>}
//     </MessageList>
//   );
// }
