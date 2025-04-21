import type { ReactNode } from 'react';
import { Box, Button, CloseButton, Dialog, Flex, Heading, Portal, Text } from '@chakra-ui/react';

export function AuthDialog({
  children,
  type,
  setType,
  ...props
}: {
  children?: ReactNode;
  type: 'login' | 'register';
  setType: (newType: 'login' | 'register') => void;
} & Dialog.RootProps) {
  return (
    <Dialog.Root motionPreset="slide-in-bottom" placement="center" size="cover" {...props}>
      <Dialog.Trigger asChild>
        <Flex gap={2}>
          <Button onClick={() => setType('login')} size="sm" variant="outline">
            Login
          </Button>
          <Button onClick={() => setType('register')} size="sm" variant="outline">
            Register
          </Button>
        </Flex>
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
              <Box
                alignItems={{ base: 'stretch', lg: 'center' }}
                display="flex"
                flexDirection={{ base: 'column', lg: 'row' }}
                gap="4"
                justifyContent="center"
              >
                <Box as="aside" flex={{ base: '0 1 0', lg: '0 1 320px' }} flexDirection="column">
                  <Heading fontSize="4xl" mb={4}>
                    {type === 'login' ? 'Login' : 'Register'}
                  </Heading>
                  <Text fontSize="xl">
                    Thanks for using our app!
                    <br />
                    Please{' '}
                    <Button onClick={() => setType('login')} p={1} variant="ghost" verticalAlign="baseline">
                      login
                    </Button>{' '}
                    or{' '}
                    <Button onClick={() => setType('register')} p={1} variant="ghost" verticalAlign="baseline">
                      register
                    </Button>{' '}
                    to continue.
                  </Text>
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
