import type { ReactNode } from 'react';
import { Box, Container, HStack, type StackProps } from '@chakra-ui/react';

import { AuthCompactLayout } from '@/entities/auth';
import { Logo } from './logo';

export function BottomSide({ rightSide, ...props }: { rightSide?: ReactNode } & StackProps) {
  return (
    <Container asChild>
      <HStack
        borderTop="sm"
        borderColor="border"
        position="fixed"
        alignItems="center"
        bg="bg"
        bottom={0}
        right={0}
        left={0}
        gap={4}
        {...props}
      >
        <Logo width={32} height={32} />

        <Box flex="1" />

        <AuthCompactLayout />

        {rightSide}
      </HStack>
    </Container>
  );
}
