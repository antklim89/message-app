import type { ReactNode } from 'react';

import { SuspenseErrorBoundary } from './suspense-error-boundary';
import { useSession } from '../hooks/use-session';
import { type User } from '../model/user';

export function Protected({
  fallback,
  privateElement,
  publicElement,
  checkIsPublic,
}: {
  publicElement?: ReactNode;
  privateElement?: ReactNode;
  checkIsPublic?: (userId: User | null) => boolean;
  fallback?: ReactNode;
}) {
  return (
    <SuspenseErrorBoundary fallback={fallback}>
      <ProtectedContent
        checkIsPublic={checkIsPublic ?? (userId => userId == null)}
        privateElement={privateElement}
        publicElement={publicElement}
      />
    </SuspenseErrorBoundary>
  );
}

export function ProtectedContent({
  privateElement,
  publicElement,
  checkIsPublic,
}: {
  publicElement: ReactNode | undefined;
  privateElement: ReactNode | undefined;
  checkIsPublic: (userId: User | null) => boolean;
}) {
  const { data: user } = useSession();

  if (checkIsPublic(user)) return publicElement;
  return privateElement;
}
