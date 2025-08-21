import type { ReactNode } from 'react';

import { SuspenseErrorBoundary } from './suspense-error-boundary';
import { useSession } from '../hooks/use-session';

export function Protected({
  fallback,
  privateElement,
  publicElement,
}: {
  publicElement?: ReactNode;
  privateElement?: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <SuspenseErrorBoundary fallback={fallback}>
      <ProtectedContent privateElement={privateElement} publicElement={publicElement} />
    </SuspenseErrorBoundary>
  );
}

export function ProtectedContent({
  privateElement,
  publicElement,
}: {
  publicElement: ReactNode | undefined;
  privateElement: ReactNode | undefined;
}) {
  const { data: user } = useSession();

  if (user == null) return publicElement;
  return privateElement;
}
