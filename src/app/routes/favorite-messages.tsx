import { createFileRoute, redirect } from '@tanstack/react-router';

import { FavoriteMessagesPage } from '@/pages/favorite-messages';
import { getSupabaseSession } from '@/shared/lib/supabase';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/favorite-messages')({
  component: FavoriteMessagesPage,
  errorComponent: ErrorComponent,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
