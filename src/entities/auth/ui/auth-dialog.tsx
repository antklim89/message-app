import { useState } from 'react';
import { Button, Stack, Text, type useDisclosure } from '@chakra-ui/react';

import { useAppForm } from '@/shared/lib/react-form';
import { Modal } from '@/shared/ui/form-dialog';
import { LoginForm, loginFormOptions } from './login-form';
import { RegisterForm, registerFormOptions } from './register-form';
import { useLoginMutation } from '../api/mutations/use-login-mutation';
import { useRegisterMutation } from '../api/mutations/use-register-mutation';

export function LoginDialog({ disclosure }: { disclosure: ReturnType<typeof useDisclosure> }) {
  const [type, setType] = useState<'login' | 'register'>('login');
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const loginForm = useAppForm({
    ...loginFormOptions,
    async onSubmit({ value, formApi }) {
      const result = await loginMutation.mutateAsync(value);
      if (result.success) return disclosure.onClose();

      formApi.setErrorMap({
        onSubmit: { fields: result.error.issues ?? {}, form: result.error.message },
      });
    },
  });

  const registerForm = useAppForm({
    ...registerFormOptions,
    async onSubmit({ value, formApi }) {
      const result = await registerMutation.mutateAsync(value);
      if (result.success) return disclosure.onClose();

      formApi.setErrorMap({
        onSubmit: { fields: result.error.issues ?? {}, form: result.error.message },
      });
    },
  });

  return (
    <Modal
      disclosure={disclosure}
      // openElement={openElement ?? <Button>Login</Button>}
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
    >
      {type === 'login' ? <LoginForm form={loginForm} /> : <RegisterForm form={registerForm} />}
    </Modal>
  );
}
