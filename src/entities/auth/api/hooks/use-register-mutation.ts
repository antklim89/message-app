import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Result } from '@/share/lib/result';
import { toaster } from '@/share/lib/toaster';
import type { CreateUserInput, UserType } from '../../models/types';
import { createUser } from '../repository/create-user';

export function useRegisterMutation() {
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
