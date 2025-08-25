import { type ReactElement, type ReactNode, useRef } from 'react';
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
  openElement: ReactElement;
  text: ReactNode;
  confirmElement: ReactElement;
  cancelButtonText?: string;
} & ReturnType<typeof useDisclosure>) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog.Root
      initialFocusEl={() => confirmRef.current}
      onOpenChange={e => setOpen(e.open)}
      open={open}
      placement="center"
      size="sm"
    >
      <Button asChild unstyled onClick={onOpen}>
        {openElement}
      </Button>
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
