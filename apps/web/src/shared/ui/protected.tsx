import type { ReactNode } from 'react';

import { authClient } from '@/shared/lib/auth-client';
import { ErrorComponent } from './error-component';

interface User {
  id: string;
  name: string;
}

export function Protected({
  fallback,
  privateElement,
  publicElement,
  authorId,
}: {
  publicElement?: ReactNode;
  privateElement?: ReactNode | ((user: User) => ReactNode);
  authorId?: User['id'];
  fallback?: ReactNode;
}) {
  const { data, error, isPending } = authClient.useSession();

  if (error) return <ErrorComponent error={{ message: error.message, name: '' }} />;
  if (isPending) return fallback;
  if (data?.user == null) return publicElement;
  if (authorId != null && authorId !== data?.user.id) return publicElement;
  return typeof privateElement === 'function' ? privateElement(data.user) : privateElement;
}
