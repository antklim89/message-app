import { Button } from '@chakra-ui/react';

import { useLogoutMutation } from '../api/hooks/use-logout-mutation';

export function LogoutButton() {
  const { mutateAsync: logout, isPending } = useLogoutMutation();

  return (
    <Button loading={isPending} size="sm" variant="outline" onClick={() => logout()}>
      Logout
    </Button>
  );
}
