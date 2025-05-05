import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/components/ui/toaster';
import type { Result } from '@/lib/result';
import { loginWithPassword } from '../services';
import type { AuthWithPasswordInput, UserType } from '../types';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<Result<UserType>, Error, AuthWithPasswordInput>({
    async mutationFn(input) {
      const loginResult = await loginWithPassword(input);
      if (loginResult.type === 'error') return loginResult;

      await queryClient.invalidateQueries();
      toaster.success({
        title: 'Login successful',
      });

      return loginResult;
    },
  });
}
