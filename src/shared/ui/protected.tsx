import type { ReactNode } from 'react';

import { SuspenseErrorBoundary } from './suspense-error-boundary';
import { useSession } from '../hooks/use-session';
import { type User } from '../model/user';

export function Protected({
  fallback,
  privateElement,
  publicElement,
  authorId,
}: {
  publicElement?: ReactNode;
  privateElement?: ReactNode | ((userId: User) => ReactNode);
  authorId?: User['id'];
  fallback?: ReactNode;
}) {
  return (
    <SuspenseErrorBoundary fallback={fallback}>
      <ProtectedContent authorId={authorId} privateElement={privateElement} publicElement={publicElement} />
    </SuspenseErrorBoundary>
  );
}

export function ProtectedContent({
  privateElement,
  publicElement,
  authorId,
}: {
  publicElement: ReactNode | undefined;
  privateElement: ReactNode | ((userId: User) => ReactNode) | undefined;
  authorId?: User['id'];
}) {
  const { user } = useSession();

  if (user == null) return publicElement;
  if (authorId != null && authorId !== user.id) return publicElement;
  return typeof privateElement === 'function' ? privateElement(user) : privateElement;
}
