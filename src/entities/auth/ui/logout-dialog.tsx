import { Button, type useDisclosure } from '@chakra-ui/react';

import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { useLogoutMutation } from '../api/mutations/use-logout-mutation';

export function LogoutDialog({ disclosure }: { disclosure: ReturnType<typeof useDisclosure> }) {
  const logoutMutation = useLogoutMutation();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    if (logoutMutation.isSuccess) disclosure.onClose();
  }

  return (
    <ConfirmDialog
      disclosure={disclosure}
      text="Are you sure you want to logout?"
      confirmElement={
        <Button colorPalette="red" loading={logoutMutation.isPending} onClick={handleLogout}>
          Logout
        </Button>
      }
    />
  );
}
