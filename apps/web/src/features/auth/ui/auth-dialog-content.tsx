import { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { Dialog } from '@message-app/ui/components/dialog';

import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { useLogin, useRegister } from '../models/hooks';

export function AuthDialogContent() {
  const [type, setType] = useState<'login' | 'register'>('login');

  const { registerForm } = useRegister();
  const { loginForm } = useLogin();

  return (
    <>
      <Dialog.Header textAlign="start">
        {type === 'login' ? (
          <>
            <Text as="h2" fontSize="2xl">
              Welcome Back
            </Text>
            <Text as="span">Please login to your account</Text>
          </>
        ) : (
          <>
            <Text as="h2" fontSize="2xl">
              Create an Account
            </Text>
            <Text as="span">Sign up to get started</Text>
          </>
        )}
      </Dialog.Header>

      <Dialog.Body>
        {type === 'login' ? <LoginForm form={loginForm} /> : <RegisterForm form={registerForm} />}

        <Text width="full" display="inline-flex" alignItems="center" gap={1}>
          {type === 'login' ? (
            <>
              <Text as="span" fontSize="sm">
                Doesn't have an account?
              </Text>
              <Button onClick={() => setType('register')} p={0} textDecoration="underline" variant="plain">
                Register
              </Button>
            </>
          ) : (
            <>
              <Text as="span" fontSize="sm">
                Already have an account?
              </Text>
              <Button onClick={() => setType('login')} p={0} textDecoration="underline" variant="plain">
                Login
              </Button>
            </>
          )}
        </Text>
      </Dialog.Body>

      <Dialog.Footer>
        {type === 'login' ? (
          <loginForm.AppForm>
            <loginForm.FormSubmitButton submittingText="Logging In...">Login</loginForm.FormSubmitButton>
          </loginForm.AppForm>
        ) : (
          <registerForm.AppForm>
            <registerForm.FormSubmitButton submittingText="Registering...">Register</registerForm.FormSubmitButton>
          </registerForm.AppForm>
        )}
      </Dialog.Footer>
    </>
  );
}
