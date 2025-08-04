import type { ReactNode } from 'react';
import { Drawer, IconButton } from '@chakra-ui/react';
import { FaBars, FaXmark } from 'react-icons/fa6';

export function RightSideDrawer({ children }: { children: ReactNode }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton variant="ghost" aria-label="toggle right side drawer">
          <FaBars />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Body>{children}</Drawer.Body>
          <Drawer.Footer>
            <Drawer.CloseTrigger asChild position="static">
              <IconButton variant="outline" aria-label="toggle right side drawer">
                <FaXmark />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
