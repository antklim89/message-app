import type { ReactElement, ReactNode } from 'react';
import { Button, CloseButton, Dialog, Portal, type UseDialogReturn } from '@chakra-ui/react';

export function ConfirmDialog({
  text,
  confirmElement,
  cancelButtonText,
  dialog,
}: {
  text: ReactNode;
  confirmElement: ReactElement;
  cancelButtonText?: string;
  dialog: UseDialogReturn;
}) {
  return (
    <Dialog.RootProvider value={dialog} placement="center" size="sm">
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

              <Button asChild unstyled autoFocus>
                {confirmElement}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}
