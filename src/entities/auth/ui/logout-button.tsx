import type { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

import { useLogoutMutation } from '../api/hooks/use-logout-mutation';

export function LogoutButton({ children }: { children: ReactNode }) {
  const { mutateAsync: logout, isPending } = useLogoutMutation();

  return (
    <Button loading={isPending} size="sm" variant="outline" onClick={() => logout()}>
      {children}
    </Button>
  );
}
