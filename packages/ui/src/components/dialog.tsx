import { isValidElement, type ReactNode, Suspense } from 'react';
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

function RootBase({ children, trigger, fallback }: { children: ReactNode; trigger: ReactNode; fallback?: ReactNode }) {
  return (
    <>
      <ChakraDialog.Trigger asChild={isValidElement(trigger)}>{trigger}</ChakraDialog.Trigger>
      <Portal>
        <ChakraDialog.Positioner>
          <ChakraDialog.Backdrop />
          <ChakraDialog.Content p={0}>
            <ChakraDialog.CloseTrigger asChild top="-0.5" right="-0.5">
              <CloseButton size="md" />
            </ChakraDialog.CloseTrigger>

            <Suspense fallback={fallback}>{children}</Suspense>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </>
  );
}

function RootProvider({
  children,
  trigger,
  dialog,
  fallback,
  ...props
}: {
  children: ReactNode;
  dialog: UseDialogReturn;
  trigger: ReactNode;
  fallback?: ReactNode;
} & DialogRootProps) {
  return (
    <ChakraDialog.RootProvider value={dialog} motionPreset="slide-in-bottom" placement="top" size="lg" {...props}>
      <RootBase trigger={trigger} fallback={fallback}>
        {children}
      </RootBase>
    </ChakraDialog.RootProvider>
  );
}

function Root({
  children,
  trigger,
  fallback,
  ...props
}: {
  children: ReactNode;
  trigger: ReactNode;
  fallback?: ReactNode;
} & DialogRootProps) {
  return (
    <ChakraDialog.Root motionPreset="slide-in-bottom" placement="top" size="lg" {...props}>
      <RootBase trigger={trigger} fallback={fallback}>
        {children}
      </RootBase>
    </ChakraDialog.Root>
  );
}

function Trigger({ children, dialog, ...props }: { children: ReactNode; dialog: UseDialogReturn } & ButtonProps) {
  return (
    <Button onClick={() => dialog.setOpen(true)} {...props}>
      {children}
    </Button>
  );
}

function Header({
  children,
  ...props
}: {
  children: ReactNode;
} & DialogHeaderProps) {
  return (
    <ChakraDialog.Header justifyContent="center" flexDirection="column" {...props}>
      {children}
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
  children?: ReactNode;
} & DialogFooterProps) {
  return (
    <ChakraDialog.Footer pb="2" display="flex" justifyItems="flex-end" {...props}>
      <ChakraDialog.CloseTrigger position="static" asChild>
        <Button variant="ghost">Close</Button>
      </ChakraDialog.CloseTrigger>

      {children}
    </ChakraDialog.Footer>
  );
}

export const Dialog = { Trigger, Root, RootProvider, Header, Body, Footer };
