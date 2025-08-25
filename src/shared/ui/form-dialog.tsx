import { type ReactElement, type ReactNode, useId } from 'react';
import { Button, CloseButton, Dialog, Portal, type useDisclosure } from '@chakra-ui/react';

export function FormDialog({
  formElement,
  openElement,
  submitElement,
  title,
  onOpen,
  setOpen,
  open,
}: {
  formElement: ReactElement;
  openElement: ReactElement;
  submitElement: ReactElement;
  title?: ReactNode;
} & ReturnType<typeof useDisclosure>) {
  const id = useId();
  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={e => setOpen(e.open)}
      placement="center"
      size="lg"
    >
      <Button unstyled asChild onClick={onOpen}>
        {openElement}
      </Button>
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

            <Dialog.Body asChild id={id}>
              {formElement}
            </Dialog.Body>

            <Dialog.Footer display="flex" justifyItems="flex-end">
              <Dialog.CloseTrigger position="static" asChild>
                <Button variant="ghost">Close</Button>
              </Dialog.CloseTrigger>

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
