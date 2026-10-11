import { Button, Heading, Skeleton, Stack, type StackProps } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaBookmark, FaGear, FaHouse, FaInfo, FaRightToBracket, FaUser } from 'react-icons/fa6';

import { AuthDialog } from '@/features/auth';
import { Protected } from '@/shared/ui/protected';
import { Logo } from './components/logo';

export function LeftLayout(props: StackProps) {
  return (
    <Stack {...props} w="full" borderRight="sm" borderColor="bg.muted">
      <Logo />

      <Heading as="h4" fontSize="2xl" textWrap="balance">
        Welcome to the App!
      </Heading>

      <Button width="full" asChild variant="ghost" justifyContent="flex-start">
        <Link to="/">
          <FaHouse />
          Home
        </Link>
      </Button>

      <Protected
        fallback={[1, 2, 3].map(i => (
          <Skeleton key={i} width="full">
            <Button />
          </Skeleton>
        ))}
        privateElement={user => (
          <>
            <Button width="full" asChild variant="ghost" justifyContent="flex-start">
              <Link to="/profile/$userId" params={{ userId: user.id }}>
                <FaUser />
                Profile
              </Link>
            </Button>
            <Button width="full" asChild variant="ghost" justifyContent="flex-start">
              <Link to="/favorite-messages">
                <FaBookmark />
                Favorites
              </Link>
            </Button>

            <Button width="full" asChild variant="ghost" justifyContent="flex-start">
              <Link to="/profile-settings">
                <FaGear /> Settings
              </Link>
            </Button>
          </>
        )}
        publicElement={
          <AuthDialog>
            <Button width="full" variant="ghost" justifyContent="flex-start">
              <FaRightToBracket />
              Login or Register
            </Button>
          </AuthDialog>
        }
      />

      <Button width="full" asChild variant="ghost" justifyContent="flex-start">
        <Link to="/about">
          <FaInfo /> About
        </Link>
      </Button>
    </Stack>
  );
}
