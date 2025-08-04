import { Button } from '@chakra-ui/react';

import { MessageList, MessageListFallback, useMessageListQuery } from '@/entities/messages';
import { withSuspenseErrorBoundary } from '@/share/ui/hoc/with-suspense-error-boundary';
import { MessageCard } from '@/widgets/message-card';

export const MessageListLayout = withSuspenseErrorBoundary(
  ({ answerId }: { answerId?: number }) => {
    const {
      data: messages,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
    } = useMessageListQuery({ answerId: answerId });

    return (
      <MessageList>
        {messages.map(message => (
          <MessageCard key={message.id} message={message} />
        ))}
        {isFetchingNextPage && <MessageListFallback />}
        {hasNextPage && <Button onClick={() => fetchNextPage()}>Show More</Button>}
      </MessageList>
    );
  },
  <MessageListFallback />,
);
