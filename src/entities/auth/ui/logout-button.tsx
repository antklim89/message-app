import type { ReactNode } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import { ConfirmDialog } from '@/share/ui/confirm-dialog';
import { useLogoutMutation } from '../api/hooks/use-logout-mutation';

export function LogoutButton({ children }: { children: ReactNode }) {
  const logoutMutation = useLogoutMutation();
  const disclosure = useDisclosure();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    if (logoutMutation.isSuccess) disclosure.onClose();
  }

  return (
    <ConfirmDialog
      {...disclosure}
      text="Are you sure you want to logout?"
      openElement={children}
      confirmElement={
        <Button colorPalette="red" loading={logoutMutation.isPending} onClick={handleLogout}>
          Logout
        </Button>
      }
    />
  );
}
