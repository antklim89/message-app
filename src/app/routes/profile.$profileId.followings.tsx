import { createFileRoute } from '@tanstack/react-router';

import { FollowingsPage } from '@/pages/followings';
import { preloadMessagesPage } from '@/pages/profile-messages';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/profile/$profileId/followings')({
  component() {
    const params = Route.useParams();
    return <FollowingsPage params={params} />;
  },
  errorComponent: ErrorComponent,
  loader: preloadMessagesPage,
});
