import { MESSAGES_PER_PAGE } from '@/entities/messages';
import { MessageFallback } from './message-fallback';

export function MessageListFallback() {
  return (
    <>
      {Array.from({ length: MESSAGES_PER_PAGE }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: This is just fallback
        <MessageFallback key={i} />
      ))}
    </>
  );
}
