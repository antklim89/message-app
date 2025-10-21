import { useState } from 'react';
import { Button, Stack, Text, type UseDialogReturn } from '@chakra-ui/react';

import { useAppForm } from '@/shared/lib/react-form';
import { Modal } from '@/shared/ui/modal';
import { LoginForm, loginFormOptions } from './login-form';
import { RegisterForm, registerFormOptions } from './register-form';
import { useLoginMutation } from '../api/mutations/use-login-mutation';
import { useRegisterMutation } from '../api/mutations/use-register-mutation';

export function LoginDialog({ dialog }: { dialog: UseDialogReturn }) {
  const [type, setType] = useState<'login' | 'register'>('login');
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const loginForm = useAppForm({
    ...loginFormOptions,
    async onSubmit({ value, formApi }) {
      const result = await loginMutation.mutateAsync(value);
      if (result.success) return dialog.setOpen(false);

      formApi.setErrorMap({
        onSubmit: { fields: result.error.issues ?? {}, form: result.error.message },
      });
    },
  });

  const registerForm = useAppForm({
    ...registerFormOptions,
    async onSubmit({ value, formApi }) {
      const result = await registerMutation.mutateAsync(value);
      if (result.success) return dialog.setOpen(false);

      formApi.setErrorMap({
        onSubmit: { fields: result.error.issues ?? {}, form: result.error.message },
      });
    },
  });

  return (
    <Modal.Root dialog={dialog}>
      <Modal.Title>
        {type === 'login' ? (
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
        )}
      </Modal.Title>

      <Modal.Body>
        {type === 'login' ? <LoginForm form={loginForm} /> : <RegisterForm form={registerForm} />}
      </Modal.Body>

      <Modal.Footer>
        {type === 'login' ? (
          <Button type="submit" form={loginForm.formId} loading={loginMutation.isPending} loadingText="Entering...">
            Login
          </Button>
        ) : (
          <Button
            type="submit"
            form={registerForm.formId}
            loading={registerMutation.isPending}
            loadingText="Registering..."
          >
            Register
          </Button>
        )}
      </Modal.Footer>
    </Modal.Root>
  );
}
