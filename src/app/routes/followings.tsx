import { createFileRoute, redirect } from '@tanstack/react-router';

import { FollowingsPage } from '@/pages/followings';
import { getSupabaseSession } from '@/shared/lib/supabase';
import { PageErrorComponent } from '@/shared/ui/page-error-component';

export const Route = createFileRoute('/followings')({
  component: FollowingsPage,
  errorComponent: PageErrorComponent,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
