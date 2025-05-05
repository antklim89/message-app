import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/components/ui/toaster';
import { logout } from '../services';

export function useLogout() {
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
