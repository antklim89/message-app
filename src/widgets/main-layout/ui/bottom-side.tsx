import type { ReactNode } from 'react';
import { Container, HStack, IconButton, Skeleton, type StackProps } from '@chakra-ui/react';
import { FaDoorOpen } from 'react-icons/fa6';

import { LoginDialog } from '@/entities/auth';
import { Protected } from '@/shared/ui/protected';
import { BottomSideLinks } from './bottom-side-links';
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

        <BottomSideLinks />

        <Protected
          fallback={<Skeleton h="60%" w={100} />}
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

        {rightSide}
      </HStack>
    </Container>
  );
}
