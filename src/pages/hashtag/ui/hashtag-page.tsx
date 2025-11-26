import { useInfiniteQuery } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';
import { AwaitComponent } from '@/shared/ui/await-component';
import { MessageCard } from '@/widgets/message-card';
import { MessageList, MessageListFallback } from '@/widgets/message-list';

export function HashtagPage({ params }: { params: { hashtag: string } }) {
  const messageListQuery = useInfiniteQuery(messageListQueryOptions({ search: params.hashtag }));

  return (
    <AwaitComponent promise={messageListQuery.promise} fallback={<MessageListFallback />}>
      {messages => (
        <MessageList emptyMessage={`No messages with hashtag "${params.hashtag}" were found`} {...messageListQuery}>
          {messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
        </MessageList>
      )}
    </AwaitComponent>
  );
}
