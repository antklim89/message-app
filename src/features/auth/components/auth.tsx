import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import { useUser } from '@/hooks/useUser.ts';
import { AuthForm } from './forms/auth-form.tsx';
import { AuthDialog } from './ui/auth-dialog.tsx';
import { LogoutButton } from './ui/logout-button.tsx';
import type { LoginSchema, RegisterSchema } from '../schemas';
import { createUser, loginWithPassword } from '../services';

export function Auth() {
  const [type, setType] = useState<'login' | 'register'>('login');

  function handleAuth(data: LoginSchema | RegisterSchema) {
    if (type === 'register') return createUser(data as RegisterSchema);
    else return loginWithPassword(data as LoginSchema);
  }

  const user = useUser();

  if (user != null)
    return (
      <Flex flexDirection="column" gap={2} my={4}>
        <Heading as="h3">Welcome {user.name}!</Heading>

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
