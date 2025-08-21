import type { ReactNode } from 'react';
import { Button, CloseButton, Dialog, Portal, type UseDisclosureProps } from '@chakra-ui/react';

export function ConfirmDialog({
  trigger,
  text,
  onConfirm,
  isConfirming,
  confirmButtonText,
  confirmButtonLoadingText,
  confirmElement,
  cancelButtonText,
  onClose,
  onOpen,
  open,
}: {
  trigger: ReactNode;
  text: ReactNode;
  onConfirm?: () => void;
  isConfirming?: boolean;
  confirmButtonText?: string;
  confirmButtonLoadingText?: string;
  confirmElement?: ReactNode;
  cancelButtonText?: string;
} & UseDisclosureProps) {
  return (
    <Dialog.Root open={open} placement="center" size="sm">
      <Dialog.Trigger asChild onClick={onOpen}>
        {trigger}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop onClick={onClose} />
        <Dialog.Positioner>
          <Dialog.Content display="flex">
            <Dialog.Header>
              <Dialog.CloseTrigger asChild onClick={onClose}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>{text}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild onClick={onClose} position="static">
                <Button variant="ghost">{cancelButtonText ?? 'Cancel'}</Button>
              </Dialog.CloseTrigger>
              {confirmElement ? (
                confirmElement
              ) : (
                <Button
                  loading={isConfirming}
                  loadingText={confirmButtonLoadingText ?? 'Confirming'}
                  onClick={() => onConfirm?.()}
                >
                  {confirmButtonText ?? 'Confirm'}
                </Button>
              )}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
