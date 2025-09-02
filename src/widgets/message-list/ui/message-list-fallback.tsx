import { type ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';

import { MESSAGES_PER_PAGE } from '@/entities/messages';

export function MessageListFallback({ children }: { children: ReactNode }) {
  return <Stack as="section">{Array.from({ length: MESSAGES_PER_PAGE }, () => children)}</Stack>;
}
