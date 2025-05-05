import { useEffect, useState } from 'react';

import { useSupbabase } from '@/lib/supabase';
import type { UserType } from '../types';

export function useUser() {
  const supabase = useSupbabase();
  const [user, setUser] = useState<UserType | null>();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_state, session) => {
      if (session == null) {
        setUser(null);
        return;
      }
      setUser({
        id: session.user.id,
        username: session.user.user_metadata.username,
      });
    });

    return data.subscription.unsubscribe;
  }, [supabase]);

  return user;
}
