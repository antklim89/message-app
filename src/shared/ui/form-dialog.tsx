import { type ReactElement, type ReactNode } from 'react';
import { Button, CloseButton, Dialog, Portal, type useDisclosure } from '@chakra-ui/react';

export function Modal({
  children,
  submitElement,
  title,
  disclosure,
}: {
  children: ReactElement;
  submitElement: ReactElement;
  title?: ReactNode;
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      open={disclosure.open}
      onOpenChange={e => disclosure.setOpen(e.open)}
      placement="center"
      size="lg"
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

              <Button asChild>{submitElement}</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
