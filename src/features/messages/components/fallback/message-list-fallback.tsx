import MessageFallback from './message-fallback';
import { MessageList } from '../message-list';

export function MessageListFallback() {
  return (
    <MessageList>
      {Array.from({ length: 5 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: This is just fallback
        <MessageFallback key={i} />
      ))}
    </MessageList>
  );
}
