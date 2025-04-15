import { Stack } from '@chakra-ui/react';
import type { ReactNode } from '@tanstack/react-router';

export function MessageList({ children }: { children: ReactNode }) {
  return (
    <Stack gap={4} my={4}>
      {children}
    </Stack>
  );
}
