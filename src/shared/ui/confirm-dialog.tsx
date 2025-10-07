import { type ReactElement, type ReactNode, useRef } from 'react';
import { Button, CloseButton, Dialog, Portal, type useDisclosure } from '@chakra-ui/react';

export function ConfirmDialog({
  text,
  confirmElement,
  cancelButtonText,
  disclosure,
}: {
  text: ReactNode;
  confirmElement: ReactElement;
  cancelButtonText?: string;
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog.Root
      role="alertdialog"
      initialFocusEl={() => confirmRef.current}
      onOpenChange={e => disclosure.setOpen(e.open)}
      open={disclosure.open}
      placement="center"
      size="sm"
    >
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop />
          <Dialog.Content
            display="flex"
            onKeyDown={e => {
              if (e.key === 'Enter') confirmRef.current?.click();
            }}
          >
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

              <Button asChild unstyled ref={confirmRef}>
                {confirmElement}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
