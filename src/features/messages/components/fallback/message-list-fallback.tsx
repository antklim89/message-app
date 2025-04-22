import { MessageFallback } from './message-fallback';
import { MESSAGES_PER_PAGE } from '../../constants';
import { MessageList } from '../message-list';

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
