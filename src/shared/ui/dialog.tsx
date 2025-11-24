import { type ReactNode, Suspense } from 'react';
import {
  Button,
  type ButtonProps,
  Dialog as ChakraDialog,
  CloseButton,
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
    <ChakraDialog.RootProvider value={dialog} motionPreset="slide-in-bottom" placement="top" size="lg" {...props}>
      <Portal>
        <ChakraDialog.Positioner>
          <ChakraDialog.Backdrop />
          <ChakraDialog.Content>
            <ChakraDialog.CloseTrigger asChild zIndex={10}>
              <CloseButton size="lg" />
            </ChakraDialog.CloseTrigger>

            <Suspense fallback={fallback}>{children}</Suspense>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </ChakraDialog.RootProvider>
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
    <ChakraDialog.Header justifyContent="center">
      <ChakraDialog.Title fontSize="xl" {...props}>
        {children}
      </ChakraDialog.Title>
    </ChakraDialog.Header>
  );
}

function Body({
  children,
  ...props
}: {
  children: ReactNode;
} & DialogBodyProps) {
  return <ChakraDialog.Body {...props}>{children}</ChakraDialog.Body>;
}

function Footer({
  children,
  ...props
}: {
  children: ReactNode;
} & DialogFooterProps) {
  return (
    <ChakraDialog.Footer display="flex" justifyItems="flex-end" {...props}>
      <ChakraDialog.CloseTrigger position="static" asChild>
        <Button variant="ghost">Close</Button>
      </ChakraDialog.CloseTrigger>

      {children}
    </ChakraDialog.Footer>
  );
}

export const Dialog = { Trigger, Root, Title, Body, Footer };
