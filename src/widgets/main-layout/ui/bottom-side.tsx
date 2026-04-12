import type { ReactNode } from 'react';
import { HStack, Icon, IconButton, Image, Skeleton, type StackProps, useDialog } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaCircleQuestion, FaDoorOpen, FaGear, FaRegBookmark, FaUser } from 'react-icons/fa6';

import { AuthDialog } from '@/features/auth';
import logoIcon from '@/shared/assets/logo.svg';
import { Dialog } from '@/shared/ui/dialog';
import { Protected } from '@/shared/ui/protected';

export function BottomSide({ rightSide, ...props }: { rightSide?: ReactNode } & StackProps) {
  const dialog = useDialog();
  return (
    <HStack
      px={4}
      alignItems="center"
      justifyContent="space-between"
      bg="bg"
      borderColor="border"
      borderTop="sm"
      bottom={0}
      gap={[1, 2]}
      left={0}
      position="fixed"
      right={0}
      {...props}
    >
      <IconButton variant="ghost" asChild>
        <Link to="/">
          <Image alt="logo" src={logoIcon} width={8} />
        </Link>
      </IconButton>

      <Protected
        fallback={Array.from({ length: 4 }).map(() => (
          <Skeleton key={Math.random()}>
            <IconButton />
          </Skeleton>
        ))}
        privateElement={user => (
          <>
            <IconButton aria-label="link to profile page" variant="ghost" asChild>
              <Link to="/profile/$profileId" params={{ profileId: user.id }}>
                <Icon as={FaUser} />
              </Link>
            </IconButton>
            <IconButton aria-label="link to profile settings" variant="ghost" asChild>
              <Link to="/profile-settings">
                <Icon as={FaGear} />
              </Link>
            </IconButton>
            <IconButton aria-label="link to favorite messages" variant="ghost" asChild>
              <Link to="/favorite-messages">
                <Icon as={FaRegBookmark} />
              </Link>
            </IconButton>
          </>
        )}
        publicElement={
          <>
            <AuthDialog dialog={dialog} />
            <Dialog.Trigger dialog={dialog} alignSelf="flex-end">
              <FaDoorOpen /> Login or Register
            </Dialog.Trigger>
          </>
        }
      />

      <IconButton aria-label="link to about page" variant="ghost" asChild>
        <Link to="/about">
          <Icon as={FaCircleQuestion} />
        </Link>
      </IconButton>

      {rightSide}
    </HStack>
  );
}
