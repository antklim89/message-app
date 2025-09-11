import type { ReactNode } from 'react';
import { Container, HStack, Icon, IconButton, Skeleton, type StackProps } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaCircleQuestion, FaDoorOpen, FaGear, FaUser } from 'react-icons/fa6';

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
        gap={4}
        left={0}
        position="fixed"
        right={0}
        {...props}
      >
        <Logo height={32} width={32} />

        <Protected
          fallback={<Skeleton h="60%" w={100} />}
          privateElement={user => (
            <>
              <IconButton aria-label="link to profile page" variant="subtle" asChild>
                <Link to="/profile/$profileId" params={{ profileId: user.id }}>
                  <Icon as={FaUser} />
                </Link>
              </IconButton>
              <IconButton aria-label="link to profile settings" variant="subtle" asChild>
                <Link to="/profile-settings">
                  <Icon as={FaGear} />
                </Link>
              </IconButton>
            </>
          )}
          publicElement={
            <LoginDialog
              openElement={
                <IconButton aria-label="login button" variant="subtle">
                  <FaDoorOpen />
                </IconButton>
              }
            />
          }
        />

        <IconButton aria-label="link to about page" variant="subtle" asChild>
          <Link to="/about">
            <Icon as={FaCircleQuestion} />
          </Link>
        </IconButton>

        {rightSide}
      </HStack>
    </Container>
  );
}
