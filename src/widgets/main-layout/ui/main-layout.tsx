import type { ReactNode } from 'react';
import { Box, Container, HStack, useBreakpoint, VStack } from '@chakra-ui/react';

import { BottomSide } from './bottom-side';
import { LeftSide } from './left-side';
// import { RightSide } from './right-side';
import { RightSideDrawer } from './right-side-drawer';
import { SideLayout } from './side-layout';

const BREAKPOINTS = ['md', 'lg', 'xl'] as const;
const SIDE_WIDTH = '14rem';
const GAP = 4;
const BOTTOM_SIDE_HEIGHT = 12;

export function MainLayout({ children, rightSide }: { rightSide: ReactNode; children: ReactNode }) {
  const breakpoint = useBreakpoint({
    breakpoints: BREAKPOINTS as unknown as string[],
    fallback: BREAKPOINTS[0],
    ssr: false,
  }) as (typeof BREAKPOINTS)[number];

  if (breakpoint === 'md') {
    return (
      <VStack gap={GAP} position="relative">
        <Container flexGrow={1} py={4}>
          {children}
        </Container>
        <BottomSide
          h={BOTTOM_SIDE_HEIGHT}
          rightSide={
            <RightSideDrawer>
              <Box display="flex" h="full" overflow="scroll">
                {rightSide}
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
            <Box flexGrow={1} mb={BOTTOM_SIDE_HEIGHT + GAP} py={4}>
              {children}
            </Box>

            <SideLayout mb={BOTTOM_SIDE_HEIGHT + GAP} width={SIDE_WIDTH}>
              {rightSide}
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
        <SideLayout asChild width={SIDE_WIDTH}>
          <LeftSide />
        </SideLayout>

        <Box flexGrow={1} py={4}>
          {children}
        </Box>

        <SideLayout width={SIDE_WIDTH}>{rightSide}</SideLayout>
      </HStack>
    </Container>
  );
}
