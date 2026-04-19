import { createFileRoute } from '@tanstack/react-router';

import { FollowersPage, preloadFollowersPage } from '@/pages/followers';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/profile/$profileId/followers')({
  component() {
    const params = Route.useParams();
    return <FollowersPage params={params} />;
  },
  errorComponent: ErrorComponent,
  loader: preloadFollowersPage,
});
