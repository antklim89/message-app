import { Button, Heading, Skeleton, SkeletonText, type StackProps, VStack } from '@chakra-ui/react';

import { AuthLayout } from '@/entities/auth';
import { LogoutButton } from '@/entities/auth/ui/logout-button';
import { Protected } from '@/share/ui/protected';
import { Logo } from './logo';

export function LeftSide(props: StackProps) {
  return (
    <VStack {...props}>
      <Logo />

      <Protected
        publicElement={<AuthLayout />}
        privateElement={
          <VStack>
            <Heading>Welcome!</Heading>
            <LogoutButton>Logout</LogoutButton>
          </VStack>
        }
        fallback={
          <VStack w="full" my={4}>
            <SkeletonText noOfLines={2} />
            <Skeleton width={100}>
              <Button />
            </Skeleton>
            <Skeleton width={100}>
              <Button />
            </Skeleton>
          </VStack>
        }
      />
    </VStack>
  );
}
