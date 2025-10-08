import type { ReactNode } from 'react';
import { Card, Stack } from '@chakra-ui/react';

export function FollowersList({ children }: { children: ReactNode }) {
  return (
    <Card.Root>
      <Card.Body asChild>
        <Stack>{children}</Stack>
      </Card.Body>
    </Card.Root>
  );
}
