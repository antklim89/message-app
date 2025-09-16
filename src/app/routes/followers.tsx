import { createFileRoute, redirect } from '@tanstack/react-router';

import { FollowersPage } from '@/pages/followers';
import { getSupabaseSession } from '@/shared/lib/supabase';
import { PageErrorComponent } from '@/shared/ui/page-error-component';

export const Route = createFileRoute('/followers')({
  component: FollowersPage,
  errorComponent: PageErrorComponent,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
