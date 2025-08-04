import type { ReactNode } from 'react';
import { Box, Container, HStack } from '@chakra-ui/react';

import { AuthCompactLayout } from '@/entities/auth';
import { useSession } from '@/share/hooks/use-session';
import { Logo } from './logo';

export function BottomSide({ rightSide }: { rightSide: ReactNode }) {
  const { data: user } = useSession();

  return (
    <>
      <Container asChild>
        <HStack
          borderTop="sm"
          borderColor="border"
          h={16}
          position="fixed"
          alignItems="center"
          bg="bg"
          bottom={0}
          right={0}
          left={0}
          gap={4}
        >
          <Logo width={32} height={32} />

          {user == null ? <AuthCompactLayout /> : null}

          <Box flex="1" />
          {rightSide}
        </HStack>
      </Container>
      <Box h={16} />
    </>
  );
}
