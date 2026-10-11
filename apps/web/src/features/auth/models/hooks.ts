import { useTransition } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';
import { useAppForm } from '@message-app/ui/lib/form';
import { toaster } from '@message-app/ui/lib/toaster';

import { authClient } from '@/shared/lib/auth-client';
import { loginFormOptions, registerFormOptions } from './form-options';

export function useLogin() {
  const loginForm = useAppForm({
    ...loginFormOptions,
    async onSubmit({ value, formApi }) {
      const { error } = await authClient.signIn.email({ email: value.email, password: value.email });
      if (error) {
        toaster.error({ title: 'Login', description: error.message, id: formApi.formId });
        return;
      }

      toaster.success({ title: 'Login', description: 'You successfully login.', id: formApi.formId });
      location.reload();
    },
  });

  return { loginForm };
}

export function useRegister() {
  const registerForm = useAppForm({
    ...registerFormOptions,
    async onSubmit({ value, formApi }) {
      const { error } = await authClient.signUp.email({
        name: value.username,
        email: value.email,
        password: value.email,
        // displayname: value.displayname,
      });
      if (error) {
        toaster.error({ title: 'Register', description: error.message, id: formApi.formId });
        return;
      }
      toaster.success({ title: 'Register', description: 'You successfully registered.', id: formApi.formId });
      location.reload();
    },
  });
  return { registerForm };
}

export function useLogout({ dialog }: { dialog?: UseDialogReturn }) {
  const [isPending, startTransition] = useTransition();
  function logout() {
    startTransition(async () => {
      await authClient.signOut();
      dialog?.setOpen(false);
    });
  }

  return { logout, isPending };
}
