import type { ReactElement, ReactNode } from 'react';
import { Button, CloseButton, Dialog, type DialogRootProps, Portal, type useDisclosure } from '@chakra-ui/react';

export function Modal({
  children,
  submitElement,
  title,
  disclosure,
  ...props
}: {
  children: ReactNode;
  submitElement: ReactElement;
  title?: ReactNode;
  disclosure: ReturnType<typeof useDisclosure>;
} & DialogRootProps) {
  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      open={disclosure.open}
      onOpenChange={e => disclosure.setOpen(e.open)}
      placement="center"
      size="lg"
      {...props}
    >
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.Header justifyContent="center">
              <Dialog.CloseTrigger asChild>
                <CloseButton size="lg" />
              </Dialog.CloseTrigger>

              {title != null && <Dialog.Title fontSize="xl">{title}</Dialog.Title>}
            </Dialog.Header>

            <Dialog.Body>{children}</Dialog.Body>

            <Dialog.Footer display="flex" justifyItems="flex-end">
              <Dialog.CloseTrigger position="static" asChild>
                <Button variant="ghost">Close</Button>
              </Dialog.CloseTrigger>

              {submitElement}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
