import type { ReactNode } from 'react';
import { Box, Button, Container, HStack, Icon, IconButton, Skeleton, type StackProps } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaCircleQuestion, FaDoorOpen, FaGear, FaRegBookmark, FaUser } from 'react-icons/fa6';

import { LoginDialog } from '@/entities/auth';
import { Protected } from '@/shared/ui/protected';
import { Logo } from './logo';

export function BottomSide({ rightSide, ...props }: { rightSide?: ReactNode } & StackProps) {
  return (
    <Container asChild>
      <HStack
        alignItems="center"
        justifyContent="space-between"
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
        <Box flex="1 0 auto">
          <Logo height={32} width={32} />
        </Box>

        <Protected
          fallback={<Skeleton h="60%" w={100} />}
          privateElement={user => (
            <>
              <IconButton flex="1 1 100%" aria-label="link to profile page" variant="subtle" asChild>
                <Link to="/profile/$profileId" params={{ profileId: user.id }}>
                  <Icon as={FaUser} />
                </Link>
              </IconButton>
              <IconButton flex="1 1 100%" aria-label="link to profile settings" variant="subtle" asChild>
                <Link to="/profile-settings">
                  <Icon as={FaGear} />
                </Link>
              </IconButton>
              <IconButton flex="1 1 100%" aria-label="link to favorite messages" variant="subtle" asChild>
                <Link to="/favorite-messages">
                  <Icon as={FaRegBookmark} />
                </Link>
              </IconButton>
            </>
          )}
          publicElement={
            <LoginDialog
              openElement={
                <Button flex="1 1 100%">
                  <FaDoorOpen /> Login or Register
                </Button>
              }
            />
          }
        />

        <IconButton flex="1 1 100%" aria-label="link to about page" variant="subtle" asChild>
          <Link to="/about">
            <Icon as={FaCircleQuestion} />
          </Link>
        </IconButton>

        {rightSide}
      </HStack>
    </Container>
  );
}
