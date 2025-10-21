import type { ReactNode } from 'react';
import { Container, Flex, HStack, Icon, IconButton, Skeleton, type StackProps, useDialog } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaCircleQuestion, FaDoorOpen, FaGear, FaRegBookmark, FaUser } from 'react-icons/fa6';

import { LoginDialog } from '@/entities/auth';
import { Modal } from '@/shared/ui/modal';
import { Protected } from '@/shared/ui/protected';
import { Logo } from './logo';

export function BottomSide({ rightSide, ...props }: { rightSide?: ReactNode } & StackProps) {
  const dialog = useDialog();
  return (
    <Container asChild>
      <HStack
        alignItems="center"
        justifyContent="flex-end"
        bg="bg"
        borderColor="border"
        borderTop="sm"
        bottom={0}
        gap={[2, 4]}
        left={0}
        position="fixed"
        right={0}
        {...props}
      >
        <Flex mr="auto" minW="6rem" justifyContent="center">
          <Logo height={32} width={32} />
        </Flex>

        <Protected
          fallback={Array.from({ length: 3 }).map(() => (
            <Skeleton key={Math.random()}>
              <IconButton flex="0 1 8rem" />
            </Skeleton>
          ))}
          privateElement={user => (
            <>
              <IconButton flex="0 1 8rem" aria-label="link to profile page" variant="subtle" asChild>
                <Link to="/profile/$profileId" params={{ profileId: user.id }}>
                  <Icon as={FaUser} />
                </Link>
              </IconButton>
              <IconButton flex="0 1 8rem" aria-label="link to profile settings" variant="subtle" asChild>
                <Link to="/profile-settings">
                  <Icon as={FaGear} />
                </Link>
              </IconButton>
              <IconButton flex="0 1 8rem" aria-label="link to favorite messages" variant="subtle" asChild>
                <Link to="/favorite-messages">
                  <Icon as={FaRegBookmark} />
                </Link>
              </IconButton>
            </>
          )}
          publicElement={
            <>
              <LoginDialog dialog={dialog} />
              <Modal.Trigger dialog={dialog} flex="1 1 100%">
                <FaDoorOpen /> Login or Register
              </Modal.Trigger>
            </>
          }
        />

        <IconButton flex="0 1 8rem" aria-label="link to about page" variant="subtle" asChild>
          <Link to="/about">
            <Icon as={FaCircleQuestion} />
          </Link>
        </IconButton>

        {rightSide}
      </HStack>
    </Container>
  );
}
