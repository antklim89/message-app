import type { ComponentType, ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';

import { SuspenseErrorBoundary } from '../suspense-error-boundary';

export function withSuspenseErrorBoundary<T extends Record<string, unknown> = Record<never, never>>(
  Component: ComponentType<T>,
  fallback?: ReactNode,
  errorFallback?: (props: Partial<FallbackProps>) => ReactNode,
): ComponentType<T> {
  return props => (
    <SuspenseErrorBoundary fallback={fallback} errorFallback={errorFallback}>
      <Component {...props} />
    </SuspenseErrorBoundary>
  );
}
