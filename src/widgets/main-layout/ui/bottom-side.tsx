import type { ReactNode } from 'react';
import { Box, Button, Container, HStack, Skeleton, type StackProps } from '@chakra-ui/react';
import { FaDoorOpen, FaRightFromBracket } from 'react-icons/fa6';

import { LoginDialog, LogoutButton } from '@/entities/auth';
import { Protected } from '@/share/ui/protected';
import { Logo } from './logo';

export function BottomSide({ rightSide, ...props }: { rightSide?: ReactNode } & StackProps) {
  return (
    <Container asChild>
      <HStack
        borderTop="sm"
        borderColor="border"
        position="fixed"
        alignItems="center"
        bg="bg"
        bottom={0}
        right={0}
        left={0}
        gap={4}
        {...props}
      >
        <Logo width={32} height={32} />

        <Box flex="1" />

        <Protected
          privateElement={
            <LogoutButton>
              <FaRightFromBracket />
            </LogoutButton>
          }
          publicElement={
            <LoginDialog
              openElement={
                <Button variant="outline">
                  <FaDoorOpen />
                </Button>
              }
            />
          }
          fallback={<Skeleton w={100} h="60%" />}
        />

        {rightSide}
      </HStack>
    </Container>
  );
}
