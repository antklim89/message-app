import type { ReactNode } from 'react';
import { Button, CloseButton, Dialog, Portal, type useDisclosure } from '@chakra-ui/react';

export function ConfirmDialog({
  openElement,
  text,
  confirmElement,
  cancelButtonText,
  onOpen,
  setOpen,
  open,
}: {
  openElement: ReactNode;
  text: ReactNode;
  confirmElement: ReactNode;
  cancelButtonText?: string;
} & ReturnType<typeof useDisclosure>) {
  return (
    <Dialog.Root onOpenChange={e => setOpen(e.open)} open={open} placement="center" size="sm">
      <Button unstyled asChild onClick={onOpen}>
        {openElement}
      </Button>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop />
          <Dialog.Content display="flex">
            <Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body fontSize="lg">{text}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild position="static">
                <Button variant="ghost">{cancelButtonText ?? 'Cancel'}</Button>
              </Dialog.CloseTrigger>

              {confirmElement}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
