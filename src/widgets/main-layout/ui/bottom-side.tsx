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
        alignItems="center"
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

        <Box flex="1" />

        <Protected
          fallback={<Skeleton h="60%" w={100} />}
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
        />

        {rightSide}
      </HStack>
    </Container>
  );
}
