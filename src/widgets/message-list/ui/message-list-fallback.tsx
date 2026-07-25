import { Stack } from '@chakra-ui/react';

import { MESSAGES_PER_PAGE } from '@/entities/messages';
import { MessageCardFallback } from '../@x/message-card';

export function MessageListFallback() {
  return (
    <Stack as="section">
      {Array.from({ length: MESSAGES_PER_PAGE }, (_, idx) => (
        <MessageCardFallback key={idx} />
      ))}
    </Stack>
  );
}
