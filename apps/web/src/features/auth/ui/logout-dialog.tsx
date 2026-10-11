import type { ReactNode } from 'react';
import { Button, Text, useDialog } from '@chakra-ui/react';
import { Dialog } from '@message-app/ui/components/dialog';

import { useLogout } from '../models/hooks';

export function LogoutDialog({ children }: { children: ReactNode }) {
  const dialog = useDialog();
  const { isPending, logout } = useLogout({ dialog });

  return (
    <Dialog.RootProvider dialog={dialog} trigger={children}>
      <Dialog.Header>
        <Text fontSize="xl" textAlign="center">
          Are you sure you want to log out?
        </Text>
      </Dialog.Header>

      <Dialog.Footer>
        <Button colorPalette="red" onClick={logout} loading={isPending} loadingText="Logging Out...">
          Log Out
        </Button>
      </Dialog.Footer>
    </Dialog.RootProvider>
  );
}
