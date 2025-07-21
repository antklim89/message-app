import type { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

import { LeftSide } from './left-side';
import { RightSide } from './right-side';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Container display="flex" gap="4">
      <LeftSide />
      <Box borderLeft="gray.600" borderRight="gray.600" borderWidth="1px" flex={8} h="vh" w="100%">
        {children}
      </Box>
      <RightSide />
    </Container>
  );
}
