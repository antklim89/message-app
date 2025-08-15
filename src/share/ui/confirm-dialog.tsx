import type { ReactNode } from 'react';
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

export function ConfirmDialog({
  trigger,
  text,
  onConfirm,
  isConfirming,
  confirmButtonText,
  confirmButtonLoadingText,
  cancelButtonText,
}: {
  trigger: ReactNode;
  text: ReactNode;
  onConfirm: () => void;
  isConfirming?: boolean;
  confirmButtonText?: string;
  confirmButtonLoadingText?: string;
  cancelButtonText?: string;
}) {
  return (
    <Dialog.Root placement="center" size="sm">
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content display="flex">
            <Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>{text}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger position="static" asChild>
                <Button variant="ghost">{cancelButtonText ?? 'Cancel'}</Button>
              </Dialog.CloseTrigger>
              <Button
                loadingText={confirmButtonLoadingText ?? 'Confirming'}
                loading={isConfirming}
                onClick={() => onConfirm()}
              >
                {confirmButtonText ?? 'Confirm'}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
