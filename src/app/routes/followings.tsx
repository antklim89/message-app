import { createFileRoute, redirect } from '@tanstack/react-router';

import { FollowingsPage } from '@/pages/followings';
import { getSupabaseSession } from '@/shared/lib/supabase';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/followings')({
  component: FollowingsPage,
  errorComponent: ErrorComponent,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
