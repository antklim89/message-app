import { MessageInfinityScroll, MessageList, MessageListFallback, useMessageListQuery } from '@/entities/messages';
import { withSuspenseErrorBoundary } from '@/share/ui/hoc/with-suspense-error-boundary';
import { MessageCard } from '@/widgets/message-card';

export const MessageListLayout = withSuspenseErrorBoundary(
  ({ answerId }: { answerId?: number }) => {
    const { data: messages, isFetchingNextPage, hasNextPage, fetchNextPage } = useMessageListQuery({ answerId });

    return (
      <MessageList>
        {messages.map(message => (
          <MessageCard key={message.id} message={message} />
        ))}
        <MessageInfinityScroll
          hasNext={hasNextPage}
          isFetchingNext={isFetchingNextPage}
          onScreenEnd={() => fetchNextPage()}
        />
      </MessageList>
    );
  },
  <MessageListFallback />,
);
