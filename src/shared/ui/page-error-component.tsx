import { Alert, Button, Center, Container } from '@chakra-ui/react';
import { Link, Navigate } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/router-core';

import { ErrType, isErr } from '@/shared/lib/result';

export const PageErrorComponent = ({ error }: ErrorComponentProps) => {
  const type = isErr(error) ? error.type : ErrType.UNEXPECTED;
  const message = isErr(error) ? error.message : error.message;

  if (type === ErrType.AUTHENTICATION) return <Navigate to="/" />;

  return (
    <Container asChild>
      <Center asChild>
        <Alert.Root status="error" border="sm" minH="40rem">
          <Alert.Content
            h="full"
            gap={8}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Alert.Title fontSize="4xl" mb={2}>
              {type === ErrType.NOT_FOUND && 'Not Found '}
              {type === ErrType.UNEXPECTED && 'Unexpected '}
              {type === ErrType.AUTHENTICATION && ' Unauthenticated '}
              Error
            </Alert.Title>
            <Alert.Description fontSize="xl" whiteSpace="pre">
              {message}
            </Alert.Description>
            <Button asChild>
              <Link reloadDocument to="/">
                Reload
              </Link>
            </Button>
          </Alert.Content>
        </Alert.Root>
      </Center>
    </Container>
  );
};
