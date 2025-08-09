import { MESSAGES_PER_PAGE, MessageList } from '@/entities/messages';
import { MessageFallback } from './message-fallback';

export function MessageListFallback() {
  return (
    <MessageList>
      {Array.from({ length: MESSAGES_PER_PAGE }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: This is just fallback
        <MessageFallback key={i} />
      ))}
    </MessageList>
  );
}
