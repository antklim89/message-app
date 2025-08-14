import { useState } from 'react';
import { Box, Button, HStack, IconButton, Text } from '@chakra-ui/react';
import { FaRightToBracket, FaUserPlus } from 'react-icons/fa6';

import { SuspenseErrorBoundary } from '@/share/ui/suspense-error-boundary';
import { Auth } from './auth';
import { AuthDialog } from './auth-dialog';

export function AuthCompactLayout() {
  const [type, setType] = useState<'login' | 'register'>('login');

  return (
    <Box my={4}>
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
          <HStack>
            <IconButton aria-label="Login" onClick={() => setType('login')} size="sm" variant="outline">
              <FaRightToBracket />
            </IconButton>
            <IconButton aria-label="Register" onClick={() => setType('register')} size="sm" variant="outline">
              <FaUserPlus />
            </IconButton>
          </HStack>
        }
      >
        <SuspenseErrorBoundary>
          <Auth type={type} />
        </SuspenseErrorBoundary>
      </AuthDialog>
    </Box>
  );
}
