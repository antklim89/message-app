import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import { AuthForm } from './forms/auth-form.tsx';
import { AuthDialog } from './ui/auth-dialog.tsx';
import type { LoginSchema, RegisterSchema } from '../schemas';
import { createUser, loginWithPassword } from '../services';

export function Auth() {
  const [type, setType] = useState<'login' | 'register' | null>(null);

  const handleRegister = (data: LoginSchema | RegisterSchema) => {
    return createUser(data as RegisterSchema);
  };
  const handleLogin = (data: LoginSchema | RegisterSchema) => {
    return loginWithPassword(data as LoginSchema);
  };

  return (
    <Flex flexDirection="column" gap={2} my={4}>
      <Heading as="h3">Welcome to the app!</Heading>

      <Flex gap={2}>
        <AuthDialog onExitComplete={() => setType(null)} setType={setType} type="register">
          <AuthForm onSubmit={handleRegister} type={type ?? 'register'} />
        </AuthDialog>

        <AuthDialog onExitComplete={() => setType(null)} setType={setType} type="login">
          <AuthForm onSubmit={handleLogin} type={type ?? 'login'} />
        </AuthDialog>
      </Flex>
    </Flex>
  );
}
