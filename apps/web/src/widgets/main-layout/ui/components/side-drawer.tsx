import { Drawer, type DrawerTriggerProps, IconButton } from '@chakra-ui/react';
import { FaBars, FaXmark } from 'react-icons/fa6';

export function SideDrawer({ children, ...props }: DrawerTriggerProps) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild top="4" position="fixed" right="4" {...props}>
        <IconButton aria-label="toggle right side drawer" variant="ghost">
          <FaBars />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header justifyContent="flex-end">
            <Drawer.CloseTrigger asChild position="static">
              <IconButton aria-label="toggle right side drawer" variant="ghost">
                <FaXmark />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body>{children}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
