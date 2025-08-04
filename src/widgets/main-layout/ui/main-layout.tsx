import type { ReactNode } from 'react';
import { Box, Container, useBreakpoint } from '@chakra-ui/react';

import { BottomSide } from './bottom-side';
import { LeftSide } from './left-side';
import { RightSide } from './right-side';
import { RightSideDrawer } from './right-side-drawer.';

export function MainLayout({ children }: { children: ReactNode }) {
  const bp = useBreakpoint({ breakpoints: ['lg'] });

  if (bp === 'lg')
    return (
      <Container display="flex" gap="4">
        <Box flex={2} py={8}>
          <Box asChild position="fixed" h="vh">
            <LeftSide />
          </Box>
        </Box>
        <Box flex={8} h="vh" w="100%">
          {children}
        </Box>
        <Box flex={2} py={8}>
          <Box asChild position="fixed" h="vh">
            <RightSide />
          </Box>
        </Box>
      </Container>
    );
  return (
    <Container display="flex" flexDirection="column" gap="4">
      <Box flex={8} h="vh" w="100%">
        {children}
      </Box>
      <BottomSide
        rightSide={
          <RightSideDrawer>
            <RightSide />
          </RightSideDrawer>
        }
      />
    </Container>
  );
}
