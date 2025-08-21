import { Button, Heading, Skeleton, SkeletonText, type StackProps, Text, VStack } from '@chakra-ui/react';

import { LoginDialog, LogoutButton } from '@/entities/auth';
import { Protected } from '@/share/ui/protected';
import { Logo } from './logo';

export function LeftSide(props: StackProps) {
  return (
    <VStack {...props}>
      <Logo />

      <Protected
        fallback={
          <VStack my={4} w="full">
            <SkeletonText noOfLines={2} />
            <Skeleton width={100}>
              <Button />
            </Skeleton>
            <Skeleton width={100}>
              <Button />
            </Skeleton>
          </VStack>
        }
        privateElement={
          <VStack>
            <Heading>Welcome!</Heading>
            <LogoutButton>Logout</LogoutButton>
          </VStack>
        }
        publicElement={
          <VStack textAlign="center">
            <Heading as="h4" fontSize="2xl" textWrap="balance">
              Welcome to the App!
            </Heading>
            <Text as="span" fontSize="lg" textWrap="balance">
              To continue please enter!
            </Text>
            <LoginDialog openElement={<Button variant="outline">Enter to the App</Button>} />
          </VStack>
        }
      />
    </VStack>
  );
}
