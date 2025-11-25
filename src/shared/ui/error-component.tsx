import { Alert, AlertIndicator, Button, Text } from '@chakra-ui/react';
import { Link, Navigate } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/router-core';
import { FaTriangleExclamation } from 'react-icons/fa6';

import { ErrType, isErr } from '@/shared/lib/result';

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
  const type = isErr(error) ? error.type : ErrType.UNEXPECTED;
  const message = isErr(error) ? error.message : error.message;

  if (type === ErrType.AUTHENTICATION) return <Navigate to="/" />;

  return (
    <Alert.Root status="error" border="sm" minH="40rem">
      <Alert.Content h="full" gap={8} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <AlertIndicator fontSize="7xl">
          <FaTriangleExclamation />
        </AlertIndicator>
        <Alert.Title fontSize="4xl" mb={2} as="h3" textTransform="uppercase">
          {type === ErrType.NOT_FOUND && 'Not Found '}
          {type === ErrType.UNEXPECTED && 'Unexpected '}
          {type === ErrType.AUTHENTICATION && ' Unauthenticated '}
          Error
        </Alert.Title>
        <Alert.Description fontSize="xl" asChild>
          <Text whiteSpace="pre-wrap">{message}</Text>
        </Alert.Description>
        <Button asChild>
          <Link reloadDocument to="/">
            Reload
          </Link>
        </Button>
      </Alert.Content>
    </Alert.Root>
  );
};
