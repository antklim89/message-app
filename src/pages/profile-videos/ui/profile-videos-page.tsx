import { useInfiniteQuery } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';
import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import { AwaitComponent } from '@/shared/ui/await-component';
import { MessageCard } from '@/widgets/message-card';
import { MessageList, MessageListFallback } from '@/widgets/message-list';

export function ProfileVideosPage({ params }: { params: { profileId: string } }) {
  const messageListQuery = useInfiniteQuery(
    messageListQueryOptions({
      authorId: params.profileId,
      embeddedType: MessageEmbeddedType.VIDEOS,
    }),
  );

  return (
    <AwaitComponent promise={messageListQuery.promise} fallback={<MessageListFallback />}>
      {messages => (
        <MessageList emptyMessage="You don't have messages with video." {...messageListQuery}>
          {messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
        </MessageList>
      )}
    </AwaitComponent>
  );
}
