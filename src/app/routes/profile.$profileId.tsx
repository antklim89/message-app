import { createFileRoute } from '@tanstack/react-router';

import { ProfilePage, preloadProfilePage } from '@/pages/profile';

export const Route = createFileRoute('/profile/$profileId')({
  component() {
    const params = Route.useParams();
    return <ProfilePage params={params} />;
  },
  loader: preloadProfilePage,
});
