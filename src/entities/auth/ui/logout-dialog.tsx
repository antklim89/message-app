import { Button, type UseDialogReturn } from '@chakra-ui/react';

import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { useLogoutMutation } from '../api/mutations/use-logout-mutation';

export function LogoutDialog({ dialog }: { dialog: UseDialogReturn }) {
  const logoutMutation = useLogoutMutation();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    if (logoutMutation.isSuccess) dialog.setOpen(false);
  }

  return (
    <ConfirmDialog
      dialog={dialog}
      text="Are you sure you want to logout?"
      confirmElement={
        <Button colorPalette="red" loading={logoutMutation.isPending} onClick={handleLogout}>
          Logout
        </Button>
      }
    />
  );
}
