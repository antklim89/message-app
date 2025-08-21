import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Result } from '@/share/lib/result';
import { toaster } from '@/share/lib/toaster';
import type { CreateUserInput, UserType } from '../../models/types';
import { createUser } from '../repository/create-user';

const TOAST_ID = 'REGISTER';

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation<Result<UserType | null>, Error, CreateUserInput>({
    async mutationFn(input) {
      const registerResult = await createUser(input);
      return registerResult;
    },
    async onSuccess({ fail, success, error }) {
      await queryClient.invalidateQueries();

      if (fail) toaster.error({ description: error.message, id: TOAST_ID });
      if (success) toaster.success({ description: 'Register successful!', id: TOAST_ID });
    },
  });
}
