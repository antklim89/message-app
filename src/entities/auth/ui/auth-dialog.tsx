import { type ReactElement, useState } from 'react';
import { Button, Stack, Text, useDisclosure } from '@chakra-ui/react';

import { useAppForm } from '@/shared/lib/react-form';
import { FormDialog } from '@/shared/ui/form-dialog';
import { LoginForm, loginFormOptions } from './login-form';
import { RegisterForm, registerFormOptions } from './register-form';
import { useLoginMutation } from '../api/hooks/use-login-mutation';
import { useRegisterMutation } from '../api/hooks/use-register-mutation';

export function LoginDialog({ openElement }: { openElement: ReactElement }) {
  const [type, setType] = useState<'login' | 'register'>('login');
  const disclosure = useDisclosure();
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const loginForm = useAppForm({
    ...loginFormOptions,
    async onSubmit({ value }) {
      const result = await loginMutation.mutateAsync(value);
      if (result.success) disclosure.onClose();
    },
  });

  const registerForm = useAppForm({
    ...registerFormOptions,
    async onSubmit({ value }) {
      const result = await registerMutation.mutateAsync(value);
      if (result.success) disclosure.onClose();
    },
  });

  return (
    <FormDialog
      {...disclosure}
      formElement={type === 'login' ? <LoginForm form={loginForm} /> : <RegisterForm form={registerForm} />}
      openElement={openElement ?? <Button>Login</Button>}
      submitElement={
        type === 'login' ? (
          <Button onClick={() => loginForm.handleSubmit()} loading={loginMutation.isPending} loadingText="Saving...">
            Login
          </Button>
        ) : (
          <Button
            onClick={() => registerForm.handleSubmit()}
            loading={registerMutation.isPending}
            loadingText="Registering..."
          >
            Register
          </Button>
        )
      }
      title={
        type === 'login' ? (
          <Stack textAlign="center">
            <Text as="span" fontSize="2xl">
              Login
            </Text>
            <Text as="span" fontSize="sm">
              Doesn't have an account?
            </Text>
            <Button onClick={() => setType('register')} p={1} variant="ghost">
              Register
            </Button>
          </Stack>
        ) : (
          <Stack textAlign="center">
            <Text as="span" fontSize="2xl">
              Register
            </Text>
            <Text as="span" fontSize="sm">
              Already have an account{' '}
            </Text>
            <Button onClick={() => setType('login')} p={1} variant="ghost">
              Login
            </Button>
          </Stack>
        )
      }
    />
  );
}
