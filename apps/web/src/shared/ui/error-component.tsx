import { Alert, AlertIndicator, IconButton, Stack } from '@chakra-ui/react';
import type { AppRouter } from '@message-app/api/routers/index';
import { Link } from '@tanstack/react-router';
import { TRPCClientError, type TRPCClientErrorLike } from '@trpc/client';
import { FaArrowsRotate, FaHouse, FaTriangleExclamation } from 'react-icons/fa6';

export function ErrorComponent({ error }: { error: TRPCClientErrorLike<AppRouter> | Error | null | undefined }) {
  if (!error) return null;

  const code = error instanceof TRPCClientError ? (error as TRPCClientErrorLike<AppRouter>).data?.code : null;
  const title = code ? code.replaceAll('_', ' ') : 'UNEXPECTED ERROR';
  const message = error.message;

  return (
    <Alert.Root status="error" variant="outline">
      <AlertIndicator fontSize="xl">
        <FaTriangleExclamation />
      </AlertIndicator>
      <Alert.Content>
        <Alert.Title fontSize="xl">{title}</Alert.Title>
        <Alert.Description whiteSpace="pre-wrap">{message}</Alert.Description>
      </Alert.Content>
      <Stack>
        <IconButton asChild size="xs">
          <Link to="/">
            <FaHouse />
          </Link>
        </IconButton>

        <IconButton size="xs" onClick={() => location.reload()}>
          <FaArrowsRotate />
        </IconButton>
      </Stack>
    </Alert.Root>
  );
}
