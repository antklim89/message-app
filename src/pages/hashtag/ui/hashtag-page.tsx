import { useInfiniteQuery } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';
import { AwaitQuery } from '@/shared/ui/await-query';
import { MessageCard, MessageCardFallback } from '@/widgets/message-card';
import { MessageList, MessageListFallback } from '@/widgets/message-list';

export function HashtagPage({ params }: { params: { hashtag: string } }) {
  const messageListQuery = useInfiniteQuery(messageListQueryOptions({ search: params.hashtag }));

  return (
    <AwaitQuery query={messageListQuery} fallback={<MessageListFallback />}>
      {messages => (
        <MessageList {...messageListQuery} loadingNextFallBack={<MessageCardFallback />}>
          {messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
        </MessageList>
      )}
    </AwaitQuery>
  );
}
