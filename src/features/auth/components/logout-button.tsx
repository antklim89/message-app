import { Button } from '@chakra-ui/react';

import { useLogout } from '../hooks/use-logout';

export function LogoutButton() {
  const { mutateAsync: logout, isPending } = useLogout();

  return (
    <Button loading={isPending} size="sm" variant="outline" onClick={() => logout()}>
      Logout
    </Button>
  );
}
