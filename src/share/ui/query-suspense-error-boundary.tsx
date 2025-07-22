import type { ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { Alert, Button } from '@chakra-ui/react';

import { SuspenseErrorBoundary } from './suspense-error-boundary';

function DefaultErrorFallback({ resetErrorBoundary, error }: FallbackProps) {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description>{error.message}</Alert.Description>
      </Alert.Content>
      <Button size="xs" onClick={() => resetErrorBoundary()}>
        Restart
      </Button>
    </Alert.Root>
  );
}

export function QuerySuspenseErrorBoundary({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <SuspenseErrorBoundary fallback={fallback} errorFallback={DefaultErrorFallback}>
      {children}
    </SuspenseErrorBoundary>
  );
}
