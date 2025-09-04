import { useMessageListQuery } from '@/entities/messages';
import { MessageCard, MessageCardFallback } from '@/widgets/message-card';
import { MessageList } from '@/widgets/message-list';

export function HomeListLayout() {
  const { data: messages, ...rest } = useMessageListQuery();

  return (
    <MessageList {...rest} loadingNextFallBack={<MessageCardFallback />}>
      {messages.map(message => (
        <MessageCard key={message.id} message={message} />
      ))}
    </MessageList>
  );
}
