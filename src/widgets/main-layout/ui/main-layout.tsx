import type { ReactNode } from 'react';
import { Box, Container, useBreakpoint } from '@chakra-ui/react';

import { BottomSide } from './bottom-side';
import { LeftSide } from './left-side';
import { RightSide } from './right-side';
import { RightSideDrawer } from './right-side-drawer.';
import { SideLayout } from './side-layout';

const BREAKPOINTS = ['sm', 'md', 'lg'] as const;
const SIDE_WIDTH = 180;
const FULL_WIDTH = 1024;
const GAP = 4;
const PADDING = 4;
const MAIN_WIDTH = FULL_WIDTH - SIDE_WIDTH * 2 - GAP * 2 - PADDING * 2;
const BOTTOM_SIDE_HEIGHT = 12;

export function MainLayout({ children }: { children: ReactNode }) {
  const bp = useBreakpoint({
    breakpoints: BREAKPOINTS as unknown as string[],
    fallback: BREAKPOINTS[0],
    ssr: false,
  }) as (typeof BREAKPOINTS)[number];

  return (
    <Container px={PADDING} my={4} display="flex" gap={{ base: GAP, mdDown: 0 }} justifyContent="center">
      {bp === 'lg' && (
        <SideLayout width={SIDE_WIDTH}>
          <LeftSide />
        </SideLayout>
      )}

      <Box w={{ base: 'full', md: MAIN_WIDTH }}>
        {children}
        {(bp === 'md' || bp === 'sm') && <Box h={BOTTOM_SIDE_HEIGHT} />}
      </Box>

      {bp === 'lg' && (
        <SideLayout width={SIDE_WIDTH}>
          <RightSide />
        </SideLayout>
      )}
      {bp === 'md' && (
        <>
          <SideLayout width={SIDE_WIDTH}>
            <RightSide pb={BOTTOM_SIDE_HEIGHT} />
          </SideLayout>
          <BottomSide h={BOTTOM_SIDE_HEIGHT} />
        </>
      )}
      {bp === 'sm' && (
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
      )}
    </Container>
  );
}
