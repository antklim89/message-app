import { type ReactNode, Suspense } from 'react';
import {
  Button,
  type ButtonProps,
  CloseButton,
  Dialog,
  type DialogBodyProps,
  type DialogFooterProps,
  type DialogHeaderProps,
  type DialogRootProps,
  Portal,
  type UseDialogReturn,
} from '@chakra-ui/react';

function Root({
  children,
  dialog,
  fallback,
  ...props
}: {
  children: ReactNode;
  fallback?: ReactNode;
  dialog: UseDialogReturn;
} & DialogRootProps) {
  return (
    <Dialog.RootProvider value={dialog} motionPreset="slide-in-bottom" placement="top" size="lg" {...props}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" />
            </Dialog.CloseTrigger>

            <Suspense fallback={fallback}>{children}</Suspense>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}

function Trigger({ children, dialog, ...props }: { children: ReactNode; dialog: UseDialogReturn } & ButtonProps) {
  return (
    <Button onClick={() => dialog.setOpen(true)} {...props}>
      {children}
    </Button>
  );
}

function Title({
  children,
  ...props
}: {
  children: ReactNode;
} & DialogHeaderProps) {
  return (
    <Dialog.Header justifyContent="center">
      <Dialog.Title fontSize="xl" {...props}>
        {children}
      </Dialog.Title>
    </Dialog.Header>
  );
}

function Body({
  children,
  ...props
}: {
  children: ReactNode;
} & DialogBodyProps) {
  return <Dialog.Body {...props}>{children}</Dialog.Body>;
}

function Footer({
  children,
  ...props
}: {
  children: ReactNode;
} & DialogFooterProps) {
  return (
    <Dialog.Footer display="flex" justifyItems="flex-end" {...props}>
      <Dialog.CloseTrigger position="static" asChild>
        <Button variant="ghost">Close</Button>
      </Dialog.CloseTrigger>

      {children}
    </Dialog.Footer>
  );
}

export const Modal = { Trigger, Root, Title, Body, Footer };
