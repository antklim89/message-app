import { useState } from 'react';
import { Button, Flex, Heading, Skeleton, SkeletonText, Text, VStack } from '@chakra-ui/react';

import { useSession } from '@/share/hooks/use-session';
import { withSuspenseErrorBoundary } from '@/share/ui/hoc/with-suspense-error-boundary';
import { Auth } from './auth';
import { AuthDialog } from './auth-dialog';
import { LogoutButton } from './logout-button';

export const AuthLayout = withSuspenseErrorBoundary(
  () => {
    const [type, setType] = useState<'login' | 'register'>('login');
    const { data: user } = useSession();

    if (user != null) {
      return (
        <VStack>
          <Heading>Welcome!</Heading>
          <LogoutButton>Logout</LogoutButton>
        </VStack>
      );
    }
    return (
      <VStack my={4}>
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
      </VStack>
    );
  },
  <VStack w="full" my={4}>
    <SkeletonText noOfLines={2} />
    <Skeleton width={100}>
      <Button />
    </Skeleton>
    <Skeleton width={100}>
      <Button />
    </Skeleton>
  </VStack>,
);
