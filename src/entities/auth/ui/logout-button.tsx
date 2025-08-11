import type { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

import { ConfirmDialog } from '@/share/ui/confirm-dialog';
import { useLogoutMutation } from '../api/hooks/use-logout-mutation';

export function LogoutButton({ children }: { children: ReactNode }) {
  const { mutateAsync: logout, isPending } = useLogoutMutation();

  return (
    <ConfirmDialog
      text="Are you sure you want to logout?"
      trigger={
        <Button loading={isPending} size="sm" variant="outline">
          {children}
        </Button>
      }
      onConfirm={logout}
      isConfirming={isPending}
    ></ConfirmDialog>
  );
}
