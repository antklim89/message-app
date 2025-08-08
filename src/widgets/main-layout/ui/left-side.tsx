import { type StackProps, VStack } from '@chakra-ui/react';

import { AuthLayout } from '@/entities/auth';
import { Logo } from './logo';

export function LeftSide(props: StackProps) {
  return (
    <VStack {...props}>
      <Logo />

      <AuthLayout />
    </VStack>
  );
}
