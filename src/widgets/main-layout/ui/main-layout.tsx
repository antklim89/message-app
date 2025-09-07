import type { ReactNode } from 'react';
import { Container, HStack, Stack, useBreakpoint } from '@chakra-ui/react';

import { BottomSide } from './bottom-side';
import { LeftSide } from './left-side';
import { RightSide } from './right-side';
import { RightSideDrawer } from './right-side-drawer';
import { SideLayout } from './side-layout';

const BREAKPOINTS = ['md', 'lg', 'xl'] as const;
const SIDE_WIDTH = '20rem';
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
      <Stack gap={GAP} position="relative">
        <Container flexGrow={1} py={4} asChild>
          <Stack>{children}</Stack>
        </Container>
        <BottomSide
          h={BOTTOM_SIDE_HEIGHT}
          rightSide={
            <RightSideDrawer>
              <Stack h="full" overflow="scroll">
                <RightSide />
              </Stack>
            </RightSideDrawer>
          }
        />
      </Stack>
    );
  }

  if (breakpoint === 'lg') {
    return (
      <Stack gap={GAP}>
        <Container asChild>
          <HStack gap={GAP} position="relative">
            <Stack flexGrow={1} mb={BOTTOM_SIDE_HEIGHT + GAP} py={4}>
              {children}
            </Stack>

            <SideLayout mb={BOTTOM_SIDE_HEIGHT + GAP} width={SIDE_WIDTH}>
              <RightSide />
            </SideLayout>
          </HStack>
        </Container>

        <BottomSide h={BOTTOM_SIDE_HEIGHT} />
      </Stack>
    );
  }

  return (
    <Container>
      <HStack gap={GAP} position="relative">
        <SideLayout asChild width={SIDE_WIDTH}>
          <LeftSide />
        </SideLayout>

        <Stack flexGrow={1} py={4}>
          {children}
        </Stack>

        <SideLayout asChild width={SIDE_WIDTH}>
          <RightSide />
        </SideLayout>
      </HStack>
    </Container>
  );
}
