import { createFileRoute, redirect } from '@tanstack/react-router';

import { FollowingsPage } from '@/pages/followings';
import { getSupabaseSession } from '@/shared/lib/supabase';

export const Route = createFileRoute('/followings')({
  component: FollowingsPage,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
