import { useInfiniteQuery } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';
import { AwaitQuery } from '@/shared/ui/await-query';
import { MessageCard } from '@/widgets/message-card';
import { MessageList, MessageListFallback } from '@/widgets/message-list';

export function FavoriteMessagesPage() {
  const messageListQuery = useInfiniteQuery(messageListQueryOptions({ isFavorites: true }));

  return (
    <AwaitQuery query={messageListQuery} fallback={<MessageListFallback />}>
      {messages => (
        <MessageList {...messageListQuery} loadingNextFallBack={<MessageListFallback />}>
          {messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
        </MessageList>
      )}
    </AwaitQuery>
  );
}
