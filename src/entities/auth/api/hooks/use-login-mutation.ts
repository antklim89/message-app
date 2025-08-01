import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Result } from '@/share/lib/result';
import { toaster } from '@/share/ui/toaster';
import type { AuthWithPasswordInput, UserType } from '../../models/types';
import { loginWithPassword } from '../repository/login-with-password';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<Result<UserType>, Error, AuthWithPasswordInput>({
    async mutationFn(input) {
      const loginResult = await loginWithPassword(input);
      if (loginResult.fail) return loginResult;

      await queryClient.invalidateQueries();
      toaster.success({
        title: 'Login successful',
      });

      return loginResult;
    },
  });
}
