import { Button, type UseDialogReturn } from '@chakra-ui/react';

import { Modal } from '@/shared/ui/modal';
import { useLogoutMutation } from '../api/mutations/use-logout-mutation';

export function LogoutDialog({ dialog }: { dialog: UseDialogReturn }) {
  const logoutMutation = useLogoutMutation();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    if (logoutMutation.isSuccess) dialog.setOpen(false);
  }

  return (
    <Modal.Root dialog={dialog}>
      <Modal.Title fontSize="xl">Are you sure you want to logout?</Modal.Title>
      <Modal.Footer>
        <Button colorPalette="red" loading={logoutMutation.isPending} onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
