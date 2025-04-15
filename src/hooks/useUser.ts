import { useEffect, useState } from 'react';

import { usePocketBase } from '@/lib/pocketbase';

export function useUser() {
  const pb = usePocketBase();

  const [user, setUser] = useState(pb.authStore.record);

  useEffect(() => {
    return pb.authStore.onChange((_token, record) => {
      setUser(record);
    });
  }, [pb]);

  return user;
}
