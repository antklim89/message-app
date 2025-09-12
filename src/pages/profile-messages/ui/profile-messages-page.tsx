import { useInfiniteQuery } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';
import { AwaitQuery } from '@/shared/ui/await-query';
import { MessageCard } from '@/widgets/message-card';
import { MessageList, MessageListFallback } from '@/widgets/message-list';

export function ProfileMessagesPage({ params }: { params: { profileId: string } }) {
  const messageListQuery = useInfiniteQuery(messageListQueryOptions({ authorId: params.profileId }));

  return (
    <AwaitQuery query={messageListQuery} fallback={<MessageListFallback />}>
      {messages => (
        <MessageList emptyMessage="You have not added any messages" {...messageListQuery}>
          {messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
        </MessageList>
      )}
    </AwaitQuery>
  );
}
