import { useMessageListQuery } from '@/entities/messages';
import { MessageCard, MessageCardFallback } from '@/widgets/message-card';
import { MessageList } from '@/widgets/message-list';

export function SearchLayout({ search }: { search: string }) {
  const { data: messages, ...rest } = useMessageListQuery({ search });

  return (
    <MessageList {...rest} loadingNextFallBack={<MessageCardFallback />}>
      {messages.map(message => (
        <MessageCard key={message.id} message={message} />
      ))}
    </MessageList>
  );
}
