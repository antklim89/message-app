import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert, Button } from '@chakra-ui/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export function ReactQueryErrorBoundary({ children }: { children: ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>{error.message}</Alert.Description>
          </Alert.Content>
          <Button size="xs" onClick={() => resetErrorBoundary()}>
            Restart
          </Button>
        </Alert.Root>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
