import { Box, Skeleton, useDialog } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa6';

import { messageListQueryOptions } from '@/entities/messages';
import { MessageCreateDialog } from '@/features/message-edit';
import { AwaitQuery } from '@/shared/ui/await-query';
import { Dialog } from '@/shared/ui/dialog';
import { Protected } from '@/shared/ui/protected';
import { MessageCard } from '@/widgets/message-card';
import { MessageList, MessageListFallback } from '@/widgets/message-list';

export function HomePage() {
  const dialog = useDialog();
  const messageQuery = useInfiniteQuery(messageListQueryOptions());

  return (
    <>
      <MessageCreateDialog answerId={undefined} dialog={dialog} />

      <Protected
        fallback={<Skeleton h={30} />}
        privateElement={
          <Dialog.Trigger dialog={dialog}>
            ADD NEW MESSAGE. <FaPlus />
          </Dialog.Trigger>
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
