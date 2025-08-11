import type { ReactNode } from 'react';
import { Box, Container, HStack, useBreakpoint, VStack } from '@chakra-ui/react';

import { BottomSide } from './bottom-side';
import { LeftSide } from './left-side';
import { RightSide } from './right-side';
import { RightSideDrawer } from './right-side-drawer.';
import { SideLayout } from './side-layout';

const BREAKPOINTS = ['md', 'lg', 'xl'] as const;
const SIDE_WIDTH = '14rem';
const GAP = 4;
const BOTTOM_SIDE_HEIGHT = 12;

export function MainLayout({ children }: { children: ReactNode }) {
  const breakpoint = useBreakpoint({
    breakpoints: BREAKPOINTS as unknown as string[],
    fallback: BREAKPOINTS[0],
    ssr: false,
  }) as (typeof BREAKPOINTS)[number];

  if (breakpoint === 'md') {
    return (
      <VStack gap={GAP} position="relative">
        <Container py={4} flexGrow={1}>
          {children}
        </Container>
        <BottomSide
          h={BOTTOM_SIDE_HEIGHT}
          rightSide={
            <RightSideDrawer>
              <Box display="flex" h="full" asChild overflow="scroll">
                <RightSide />
              </Box>
            </RightSideDrawer>
          }
        />
      </VStack>
    );
  }

  if (breakpoint === 'lg') {
    return (
      <VStack gap={GAP}>
        <Container asChild>
          <HStack gap={GAP} position="relative">
            <Box py={4} flexGrow={1} mb={BOTTOM_SIDE_HEIGHT + GAP}>
              {children}
            </Box>

            <SideLayout width={SIDE_WIDTH} mb={BOTTOM_SIDE_HEIGHT + GAP}>
              <RightSide />
            </SideLayout>
          </HStack>
        </Container>

        <BottomSide h={BOTTOM_SIDE_HEIGHT} />
      </VStack>
    );
  }

  return (
    <Container>
      <HStack gap={GAP} position="relative">
        <SideLayout width={SIDE_WIDTH}>
          <LeftSide />
        </SideLayout>

        <Box py={4} flexGrow={1}>
          {children}
        </Box>

        <SideLayout width={SIDE_WIDTH}>
          <RightSide />
        </SideLayout>
      </HStack>
    </Container>
  );
}
