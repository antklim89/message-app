import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AwaitComponent } from './await-component';
import { sessionQueryOptions } from '../hooks/use-session';
import type { User } from '../model/user';

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
  const sessionQuery = useQuery(sessionQueryOptions());

  return (
    <AwaitComponent promise={sessionQuery.promise} fallback={fallback}>
      {user => {
        if (user == null) return publicElement;
        if (authorId != null && authorId !== user.id) return publicElement;
        return typeof privateElement === 'function' ? privateElement(user) : privateElement;
      }}
    </AwaitComponent>
  );
}
