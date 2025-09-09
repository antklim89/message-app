import type { ReactNode } from 'react';
import { Drawer, IconButton } from '@chakra-ui/react';
import { FaBars, FaXmark } from 'react-icons/fa6';

export function RightSideDrawer({ children }: { children: ReactNode }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton aria-label="toggle right side drawer" variant="ghost">
          <FaBars />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content bg="bg/40">
          <Drawer.Body>{children}</Drawer.Body>
          <Drawer.Footer>
            <Drawer.CloseTrigger asChild position="static">
              <IconButton aria-label="toggle right side drawer" colorPalette="red" variant="solid">
                <FaXmark />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
