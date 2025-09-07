import { useMessageListQuery } from '@/entities/messages';
import { MessageCard, MessageCardFallback } from '@/widgets/message-card';
import { MessageList } from '@/widgets/message-list';

export function ProfileMessagesLayout({ profileId }: { profileId: string }) {
  const { data: messages, ...rest } = useMessageListQuery({ authorId: profileId });

  return (
    <MessageList {...rest} loadingNextFallBack={<MessageCardFallback />}>
      {messages.map(message => (
        <MessageCard key={message.id} message={message} />
      ))}
    </MessageList>
  );
}
