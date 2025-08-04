import type { ReactNode } from 'react';
import { Box, CloseButton, Dialog, Heading, Portal } from '@chakra-ui/react';

export function AuthDialog({
  children,
  title,
  trigger,
  toggleText,
  ...props
}: {
  children?: ReactNode;
  trigger: ReactNode;
  toggleText: ReactNode;
  title: ReactNode;
} & Dialog.RootProps) {
  return (
    <Dialog.Root motionPreset="slide-in-bottom" placement="center" size="cover" {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
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
              <Box
                alignItems={{ base: 'stretch', lg: 'center' }}
                display="flex"
                flexDirection={{ base: 'column', lg: 'row' }}
                gap="4"
                justifyContent="center"
              >
                <Box as="aside" flex={{ base: '0 1 0', lg: '0 1 320px' }} flexDirection="column">
                  <Heading fontSize="4xl" mb={4}>
                    {title}
                  </Heading>
                  {toggleText}
                </Box>
                <Box as="section" flex={{ base: '0 1 0', lg: '0 1 320px' }}>
                  {children}
                </Box>
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
