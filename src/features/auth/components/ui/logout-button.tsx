import { Button } from '@chakra-ui/react';

import { logout } from '../../services';

export function LogoutButton() {
  return (
    <Button size="sm" variant="outline" onClick={() => logout()}>
      Logout
    </Button>
  );
}
