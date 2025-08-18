import { Button, Heading, Skeleton, SkeletonText, type StackProps, Text, VStack } from '@chakra-ui/react';

import { LoginDialog, LogoutButton } from '@/entities/auth';
import { Protected } from '@/share/ui/protected';
import { Logo } from './logo';

export function LeftSide(props: StackProps) {
  return (
    <VStack {...props}>
      <Logo />

      <Protected
        publicElement={
          <VStack textAlign="center">
            <Heading as="h4" textWrap="balance" fontSize="2xl">
              Welcome to the App!
            </Heading>
            <Text fontSize="lg" as="span" textWrap="balance">
              To continue please enter!
            </Text>
            <LoginDialog openElement={<Button variant="outline">Enter to the App</Button>} />
          </VStack>
        }
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
