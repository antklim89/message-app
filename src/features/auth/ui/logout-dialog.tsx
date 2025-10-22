import { Button, type UseDialogReturn } from '@chakra-ui/react';

import { Dialog } from '@/shared/ui/dialog';
import { useLogoutMutation } from '../api/mutations/use-logout-mutation';

export function LogoutDialog({ dialog }: { dialog: UseDialogReturn }) {
  const logoutMutation = useLogoutMutation();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    if (logoutMutation.isSuccess) dialog.setOpen(false);
  }

  return (
    <Dialog.Root dialog={dialog}>
      <Dialog.Title fontSize="xl">Are you sure you want to logout?</Dialog.Title>
      <Dialog.Footer>
        <Button colorPalette="red" loading={logoutMutation.isPending} onClick={handleLogout}>
          Logout
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
}
