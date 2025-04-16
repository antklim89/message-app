import { Box, Skeleton } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

import { QuerySuspenseErrorBoundary } from '@/components/suspense/query-suspense-error-boundary';
import { SuspenseErrorBoundary } from '@/components/suspense/suspense-error-boundary';
import {
  Message,
  MessageFallback,
  MessageList,
  MessageListFallback,
  NewMessage,
  useFetchManyMessages,
  useFetchOneMessage,
} from '@/features/messages';
import { useUser } from '@/hooks/useUser';

export const Route = createFileRoute('/message/$messageId')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <QuerySuspenseErrorBoundary fallback={<MessageFallback />}>
        <AnswerMessageLayout />
      </QuerySuspenseErrorBoundary>
      <SuspenseErrorBoundary fallback={<Skeleton h={30} />}>
        <NewMessageLayout />
      </SuspenseErrorBoundary>
      <QuerySuspenseErrorBoundary fallback={<MessageListFallback />}>
        <MessageListLayout />
      </QuerySuspenseErrorBoundary>
    </div>
  );
}

function AnswerMessageLayout() {
  const { messageId } = Route.useParams();
  const { data } = useFetchOneMessage({ id: messageId });

  return <Message message={data} />;
}

function NewMessageLayout() {
  const user = useUser();

  if (user == null) return <Box h={30} />;
  return <NewMessage />;
}

function MessageListLayout() {
  const { data } = useFetchManyMessages();

  return (
    <MessageList>
      {data.items.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </MessageList>
  );
}
