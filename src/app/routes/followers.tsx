import { createFileRoute, redirect } from '@tanstack/react-router';

import { FollowersPage } from '@/pages/followers';
import { getSupabaseSession } from '@/shared/lib/supabase';

export const Route = createFileRoute('/followers')({
  component: FollowersPage,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
