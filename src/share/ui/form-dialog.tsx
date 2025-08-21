import { type ReactElement, type ReactNode, useId } from 'react';
import { Button, CloseButton, Dialog, Portal, type UseDisclosureProps } from '@chakra-ui/react';

export function FormDialog({
  formElement,
  openElement,
  submitElement,
  title,
  onClose,
  onOpen,
  open,
}: {
  formElement: ReactElement;
  openElement: ReactElement;
  submitElement: ReactElement;
  title?: ReactNode;
} & UseDisclosureProps) {
  const id = useId();
  return (
    <Dialog.Root motionPreset="slide-in-bottom" open={open} placement="center" size="lg">
      <Dialog.Trigger asChild onClick={onOpen}>
        {openElement}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop onClick={onClose} />
          <Dialog.Content>
            <Dialog.Header justifyContent="center">
              <Dialog.CloseTrigger asChild>
                <CloseButton onClick={onClose} size="lg" />
              </Dialog.CloseTrigger>

              {title != null && <Dialog.Title fontSize="xl">{title}</Dialog.Title>}
            </Dialog.Header>

            <Dialog.Body asChild id={id}>
              {formElement}
            </Dialog.Body>

            <Dialog.Footer display="flex" justifyItems="flex-end">
              <Button onClick={onClose} variant="ghost">
                Close
              </Button>

              <Button asChild form={id} type="submit">
                {submitElement}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
