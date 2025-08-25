import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/shared/lib/toaster';
import type { AuthWithPasswordInput } from '../../models/types';
import { loginWithPassword } from '../repository/login-with-password';

const TOAST_ID = 'LOGIN';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<Awaited<ReturnType<typeof loginWithPassword>>, Error, AuthWithPasswordInput>({
    async mutationFn(input) {
      toaster.loading({ description: 'Log in...', id: TOAST_ID });
      const loginResult = await loginWithPassword(input);
      return loginResult;
    },
    async onSuccess({ fail, success, error }) {
      await queryClient.invalidateQueries();

      if (fail) toaster.error({ description: error.message, id: TOAST_ID });
      if (success) toaster.success({ description: 'Login successful!', id: TOAST_ID });
    },
  });
}
