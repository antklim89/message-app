import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AwaitQuery } from './await-query';
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
    <AwaitQuery query={sessionQuery} fallback={fallback}>
      {user => {
        if (user == null) return publicElement;
        if (authorId != null && authorId !== user.id) return publicElement;
        return typeof privateElement === 'function' ? privateElement(user) : privateElement;
      }}
    </AwaitQuery>
  );
}
