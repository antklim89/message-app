import type { ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';

export function MessageList({ children }: { children: ReactNode }) {
  return (
    <Stack gap={4} my={4}>
      {children}
    </Stack>
  );
}
