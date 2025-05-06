import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/components/ui/toaster';
import type { Result } from '@/lib/result';
import { createUser } from '../services';
import type { CreateUserInput, UserType } from '../types';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<Result<UserType | null>, Error, CreateUserInput>({
    async mutationFn(input) {
      const registerResult = await createUser(input);
      if (registerResult.fail) return registerResult;

      await queryClient.invalidateQueries();
      toaster.create({
        title: 'Register successful',
      });

      return registerResult;
    },
  });
}
