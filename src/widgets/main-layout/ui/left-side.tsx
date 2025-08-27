import { Button, Heading, Skeleton, SkeletonText, type StackProps, Text, VStack } from '@chakra-ui/react';

import { LoginDialog } from '@/entities/auth';
import { Protected } from '@/shared/ui/protected';
import { LiftSideLinks } from './lift-side-links';
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
          privateElement={
            <>
              <Heading>Welcome!</Heading>
              <LiftSideLinks />
            </>
          }
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
              <LiftSideLinks />
            </>
          }
        />
      </VStack>
    </VStack>
  );
}
