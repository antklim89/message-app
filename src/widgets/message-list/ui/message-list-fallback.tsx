import { Stack } from '@chakra-ui/react';

import { MESSAGES_PER_PAGE } from '@/entities/messages';
import { MessageCardFallback } from '../@x/message-card';

export function MessageListFallback() {
  return (
    <Stack as="section">
      {Array.from({ length: MESSAGES_PER_PAGE }, (_, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: this is just a fallback
        <MessageCardFallback key={idx} />
      ))}
    </Stack>
  );
}
