import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';
import { MessageCreateCollapsible } from '@/features/message-edit';
import { AwaitErrorBoundary } from '@/shared/ui/await-error-boundary';
import { Protected } from '@/shared/ui/protected';
import { MessageCard, MessageCardFallback } from '@/widgets/message-card';
import { MessageList, MessageListFallback } from '@/widgets/message-list';

export function HomePage() {
  const messageQuery = useInfiniteQuery(messageListQueryOptions());

  return (
    <>
      <Protected
        fallback={<Skeleton h={30} />}
        privateElement={
          <MessageCreateCollapsible
            answerId={undefined}
            trigger={<Button variant="outline">Add New Message.</Button>}
          />
        }
        publicElement={<Box h={30} />}
      />

      <AwaitErrorBoundary query={messageQuery} fallback={<MessageListFallback />}>
        {messages => (
          <MessageList {...messageQuery} loadingNextFallBack={<MessageCardFallback />}>
            {messages.map(message => (
              <MessageCard key={message.id} message={message} />
            ))}
          </MessageList>
        )}
      </AwaitErrorBoundary>
    </>
  );
}
