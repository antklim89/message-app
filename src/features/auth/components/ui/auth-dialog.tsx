import {
  Button,
  CloseButton,
  Dialog,
  Portal,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';


export function AuthDialog({ children, buttonText }: { children?: ReactNode; buttonText: string }) {
  return (
    <Dialog.Root motionPreset="slide-in-bottom" placement="center" size="cover">
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline">
          {buttonText}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="lg" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body asChild>
              {children}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
