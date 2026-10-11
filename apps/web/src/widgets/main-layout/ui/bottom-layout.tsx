import type { ReactNode } from 'react';
import { HStack, IconButton, Skeleton, type StackProps, VisuallyHidden } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaBookmark, FaGear, FaHouse, FaInfo, FaRightToBracket, FaUser } from 'react-icons/fa6';

import { AuthDialog } from '@/features/auth';
import { Protected } from '@/shared/ui/protected';
import { Logo } from './components/logo';

export function BottomLayout({ rightSide, ...props }: { rightSide?: ReactNode } & StackProps) {
  return (
    <HStack {...props}>
      <Logo />
      <HStack display="flex" justifyContent="space-between" width="full" maxWidth="420px" mx="auto">
        <IconButton asChild variant="ghost">
          <Link to="/">
            <FaHouse />
            <VisuallyHidden>Home</VisuallyHidden>
          </Link>
        </IconButton>

        <Protected
          fallback={[1, 2, 3].map(i => (
            <Skeleton key={i}>
              <IconButton />
            </Skeleton>
          ))}
          privateElement={user => (
            <>
              <IconButton asChild variant="ghost">
                <Link to="/profile/$userId" params={{ userId: user.id }}>
                  <FaUser />
                  <VisuallyHidden>Profile</VisuallyHidden>
                </Link>
              </IconButton>
              <IconButton asChild variant="ghost">
                <Link to="/favorite-messages">
                  <FaBookmark />
                  <VisuallyHidden>Favorites</VisuallyHidden>
                </Link>
              </IconButton>
              <IconButton asChild variant="ghost">
                <Link to="/profile-settings">
                  <FaGear /> <VisuallyHidden>Settings</VisuallyHidden>
                </Link>
              </IconButton>
            </>
          )}
          publicElement={
            <AuthDialog>
              <IconButton variant="ghost">
                <FaRightToBracket />
                <VisuallyHidden>Login or Register</VisuallyHidden>
              </IconButton>
            </AuthDialog>
          }
        />
        <IconButton asChild variant="ghost">
          <Link to="/about">
            <FaInfo />
            <VisuallyHidden>About</VisuallyHidden>
          </Link>
        </IconButton>
      </HStack>
    </HStack>
  );
}
