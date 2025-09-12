import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';
import { MessageCreateCollapsible } from '@/features/message-edit';
import { AwaitQuery } from '@/shared/ui/await-query';
import { Protected } from '@/shared/ui/protected';
import { MessageCard } from '@/widgets/message-card';
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

      <AwaitQuery query={messageQuery} fallback={<MessageListFallback />}>
        {messages => (
          <MessageList {...messageQuery}>
            {messages.map(message => (
              <MessageCard key={message.id} message={message} />
            ))}
          </MessageList>
        )}
      </AwaitQuery>
    </>
  );
}
