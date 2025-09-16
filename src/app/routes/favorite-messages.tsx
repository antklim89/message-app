import { createFileRoute, redirect } from '@tanstack/react-router';

import { FavoriteMessagesPage } from '@/pages/favorite-messages';
import { getSupabaseSession } from '@/shared/lib/supabase';
import { PageErrorComponent } from '@/shared/ui/page-error-component';

export const Route = createFileRoute('/favorite-messages')({
  component: FavoriteMessagesPage,
  errorComponent: PageErrorComponent,
  async beforeLoad() {
    const session = await getSupabaseSession();
    if (!session) return redirect({ to: '/' });
  },
});
