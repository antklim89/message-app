import { Button, Heading, Skeleton, SkeletonText, type StackProps, Text, useDialog, VStack } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { AuthDialog } from '@/features/auth';
import { Modal } from '@/shared/ui/modal';
import { Protected } from '@/shared/ui/protected';
import { Logo } from './logo';

export function LeftSide(props: StackProps) {
  const dialog = useDialog();

  return (
    <VStack {...props}>
      <Logo />
      <VStack my={4} w="full">
        <Protected
          fallback={
            <>
              <SkeletonText noOfLines={2} />
              {Array.from({ length: 6 }).map(() => (
                <Skeleton key={Math.random()} width="full">
                  <Button />
                </Skeleton>
              ))}
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
              <Button width="full" asChild variant="solid">
                <Link to="/favorite-messages">Favorites</Link>
              </Button>
              <Button width="full" asChild variant="solid">
                <Link to="/followers">Followers</Link>
              </Button>
              <Button width="full" asChild variant="solid">
                <Link to="/followings">Followings</Link>
              </Button>
              <Button width="full" asChild variant="solid">
                <Link to="/profile-settings">Settings</Link>
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

              <AuthDialog dialog={dialog} />
              <Modal.Trigger mb={8} width="full" dialog={dialog}>
                Login or Register
              </Modal.Trigger>
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
