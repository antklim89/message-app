import { Heading, type StackProps, VStack } from '@chakra-ui/react';

import { AuthLayout } from '@/entities/auth';
import { LogoutButton } from '@/entities/auth/ui/logout-button';
import { useSession } from '@/share/hooks/use-session';
import { Logo } from './logo';

export function LeftSide(props: StackProps) {
  const { data: user } = useSession();
  return (
    <VStack {...props}>
      <Logo />
      {user != null ? (
        <VStack>
          <Heading>Welcome!</Heading>
          <LogoutButton />
        </VStack>
      ) : (
        <AuthLayout />
      )}
    </VStack>
  );
}
