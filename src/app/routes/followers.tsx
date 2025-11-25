import { createFileRoute, redirect } from '@tanstack/react-router';

import { FollowersPage } from '@/pages/followers';
import { getSupabaseSession } from '@/shared/lib/supabase';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/followers')({
  component: FollowersPage,
  errorComponent: ErrorComponent,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
