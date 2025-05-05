import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import { AuthForm } from './forms/auth-form';
import { LogoutButton } from './logout-button';
import { AuthDialog } from './ui/auth-dialog';
import { useAuthenticated } from '../hooks/use-authenticated';
import { useLogin } from '../hooks/use-login';
import { useRegister } from '../hooks/use-register';
import type { LoginSchema, RegisterSchema } from '../schemas';

export function Auth() {
  const [type, setType] = useState<'login' | 'register'>('login');
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: register } = useRegister();

  function handleAuth(data: LoginSchema | RegisterSchema) {
    if (type === 'register') return register(data as RegisterSchema);
    else return login(data as LoginSchema);
  }

  const isAuthenticated = useAuthenticated();

  if (isAuthenticated)
    return (
      <Flex flexDirection="column" gap={2} my={4}>
        <Heading as="h3">Welcome!</Heading>

        <LogoutButton />
      </Flex>
    );

  return (
    <Flex flexDirection="column" gap={2} my={4}>
      <Heading as="h3">Welcome. Enter to the app to send messages.</Heading>

      <AuthDialog setType={setType} type={type}>
        <AuthForm onSubmit={handleAuth} type={type} />
      </AuthDialog>
    </Flex>
  );
}
