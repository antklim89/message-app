import { Button, Heading, Skeleton, SkeletonText, type StackProps, Text, VStack } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { LoginDialog } from '@/entities/auth';
import { Protected } from '@/shared/ui/protected';
import { Logo } from './logo';

export function LeftSide(props: StackProps) {
  return (
    <VStack {...props}>
      <Logo />
      <VStack my={4} w="full" textAlign="center">
        <Protected
          fallback={
            <>
              <SkeletonText noOfLines={2} />
              <Skeleton width={100}>
                <Button />
              </Skeleton>
              <Skeleton width={100}>
                <Button />
              </Skeleton>
            </>
          }
          privateElement={user => (
            <>
              <Heading>Welcome!</Heading>
              <Button width="full" asChild variant="solid">
                <Link to="/profile/$profileId" params={{ profileId: user.id }}>
                  Profile
                </Link>
              </Button>
            </>
          )}
          publicElement={
            <>
              <Heading as="h4" fontSize="2xl" textWrap="balance">
                Welcome to the App!
              </Heading>
              <Text as="span" fontSize="lg" textWrap="balance">
                To continue please
              </Text>
              <LoginDialog
                openElement={
                  <Button textTransform="uppercase" mb={8} width="full">
                    Enter
                  </Button>
                }
              />
            </>
          }
        />

        <Button width="full" asChild variant="solid">
          <Link to="/about">About</Link>
        </Button>
      </VStack>
    </VStack>
  );
}
