import { createFileRoute, redirect } from '@tanstack/react-router';

import { ProfileSettingsPage } from '@/pages/profile-settings';
import { getSupabaseSession } from '@/shared/lib/supabase';

export const Route = createFileRoute('/profile-settings')({
  component: ProfileSettingsPage,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
