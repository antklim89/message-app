import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/share/lib/toaster';
import { logout } from '../repository/logout';

const TOAST_ID = 'LOGOUT';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      const logoutResult = await logout();
      return logoutResult;
    },
    async onSuccess({ fail, success, error }) {
      await queryClient.invalidateQueries();

      if (fail) toaster.error({ description: error.message, id: TOAST_ID });
      if (success) toaster.success({ description: 'Logout successful!', id: TOAST_ID });
    },
  });
}
