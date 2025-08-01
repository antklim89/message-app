import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/share/ui/toaster';
import { logout } from '../repository/logout';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      await logout();

      await queryClient.invalidateQueries();
      toaster.success({
        title: 'Logout successful',
      });
    },
  });
}
