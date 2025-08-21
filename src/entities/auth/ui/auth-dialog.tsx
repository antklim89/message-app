import { type ReactElement, useState } from 'react';
import { Button, Text, useDisclosure } from '@chakra-ui/react';

import { FormDialog } from '@/share/ui/form-dialog';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { useLoginMutation } from '../api/hooks/use-login-mutation';
import { useRegisterMutation } from '../api/hooks/use-register-mutation';
import type { LoginSchema, RegisterSchema } from '../models/schemas';

export function LoginDialog({ openElement }: { openElement: ReactElement }) {
  const [type, setType] = useState<'login' | 'register'>('login');
  const disclosure = useDisclosure();
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  async function handleLogin(data: LoginSchema) {
    const result = await loginMutation.mutateAsync(data);
    if (result.success) disclosure.onClose();
    return result;
  }
  async function handleRegister(data: RegisterSchema) {
    const result = await registerMutation.mutateAsync(data);
    if (result.success) disclosure.onClose();
    return result;
  }

  return (
    <FormDialog
      {...disclosure}
      formElement={type === 'login' ? <LoginForm onSubmit={handleLogin} /> : <RegisterForm onSubmit={handleRegister} />}
      openElement={openElement ?? <Button>Login</Button>}
      submitElement={
        type === 'login' ? (
          <Button loading={loginMutation.isPending} loadingText="Saving...">
            Save
          </Button>
        ) : (
          <Button loading={registerMutation.isPending} loadingText="Registering...">
            Register
          </Button>
        )
      }
      title={
        type === 'login' ? (
          <Text display="flex" flexDirection="column" textAlign="center">
            <Text as="span" fontSize="2xl">
              Login
            </Text>
            <Text as="span" fontSize="sm">
              Doesn't have an account?{' '}
              <Button onClick={() => setType('register')} p={1} variant="ghost">
                Register
              </Button>
            </Text>
          </Text>
        ) : (
          <Text display="flex" flexDirection="column" textAlign="center">
            <Text as="span" fontSize="2xl">
              Register
            </Text>
            <Text as="span" fontSize="sm">
              Already have an account{' '}
              <Button onClick={() => setType('login')} p={1} variant="ghost">
                Login
              </Button>
            </Text>
          </Text>
        )
      }
    />
  );
}
