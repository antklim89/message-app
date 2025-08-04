import { useState } from 'react';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';

import { Auth } from './auth';
import { AuthDialog } from './auth-dialog';

export function AuthLayout() {
  const [type, setType] = useState<'login' | 'register'>('login');

  return (
    <Flex flexDirection="column" gap={2} my={4}>
      <Heading as="h3">Welcome. Enter to the app to send messages.</Heading>

      <AuthDialog
        toggleText={
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
        }
        title={type === 'login' ? 'Login' : 'Register'}
        trigger={
          <Flex gap={2}>
            <Button onClick={() => setType('login')} size="sm" variant="outline">
              Login
            </Button>
            <Button onClick={() => setType('register')} size="sm" variant="outline">
              Register
            </Button>
          </Flex>
        }
      >
        <Auth type={type} />
      </AuthDialog>
    </Flex>
  );
}
