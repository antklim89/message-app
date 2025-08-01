import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import { useSession } from '@/share/hooks/use-session';
import { AuthDialog } from './auth-dialog';
import { AuthForm } from './auth-form';
import { LogoutButton } from './logout-button';
import { useLoginMutation } from '../api/hooks/use-login-mutation';
import { useRegisterMutation } from '../api/hooks/use-register-mutation';
import type { LoginSchema, RegisterSchema } from '../models/schemas';

export function Auth() {
  const [type, setType] = useState<'login' | 'register'>('login');
  const { mutateAsync: login } = useLoginMutation();
  const { mutateAsync: register } = useRegisterMutation();

  function handleAuth(data: LoginSchema | RegisterSchema) {
    if (type === 'register') return register(data as RegisterSchema);
    else return login(data as LoginSchema);
  }

  const { data: user } = useSession();

  if (user)
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
