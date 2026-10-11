import type { ReactNode } from 'react';
import { Container, HStack, Stack } from '@chakra-ui/react';

import { Bottom } from './components/bottom';
import { Center } from './components/center';
import { Side } from './components/side';
import { SideDrawer } from './components/side-drawer';

const SIDE_WIDTH = '18rem';
const GAP = 4;
const BOTTOM_SIDE_HEIGHT = 12;

export function MainLayout({
  children,
  rightSide,
  leftSide,
  bottomSide,
}: {
  children: ReactNode;
  rightSide: ReactNode;
  leftSide: ReactNode;
  bottomSide: ReactNode;
}) {
  return (
    <>
      <Container display={{ base: 'none', xl: 'flex' }} asChild>
        <HStack gap={GAP} position="relative">
          <Side width={SIDE_WIDTH}>{leftSide}</Side>

          <Center>{children}</Center>

          <Side width={SIDE_WIDTH}>{rightSide}</Side>
        </HStack>
      </Container>

      <Stack display={{ base: 'none', lg: 'flex', xl: 'none' }}>
        <Container asChild>
          <HStack gap={GAP} position="relative">
            <Center mb={BOTTOM_SIDE_HEIGHT + GAP}>{children}</Center>

            <Side mb={BOTTOM_SIDE_HEIGHT} width={SIDE_WIDTH}>
              {rightSide}
            </Side>
          </HStack>
        </Container>
        <Bottom height={BOTTOM_SIDE_HEIGHT}>{bottomSide}</Bottom>
      </Stack>

      <Stack gap={GAP} position="relative" display={{ base: 'flex', lg: 'none' }}>
        <Container mb={BOTTOM_SIDE_HEIGHT + GAP} asChild>
          <Center>{children}</Center>
        </Container>

        <SideDrawer>{rightSide}</SideDrawer>

        <Bottom height={BOTTOM_SIDE_HEIGHT}>{bottomSide}</Bottom>
      </Stack>
    </>
  );
}
