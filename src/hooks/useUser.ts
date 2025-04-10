import { useEffect, useState } from 'react';

import { pb } from '@/lib/pocketbase';

export function useUser() {
  const [user, setUser] = useState(pb.authStore.record);

  useEffect(() => {
    return pb.authStore.onChange((_token, record) => {
      setUser(record);
    });
  }, []);

  return user;
}
