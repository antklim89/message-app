import { createFileRoute } from '@tanstack/react-router';

import { ProfileMessagesPage, preloadMessagesPage } from '@/pages/profile-messages';

export const Route = createFileRoute('/profile/$profileId/messages')({
  component() {
    const params = Route.useParams();
    return <ProfileMessagesPage params={params} />;
  },
  loader: preloadMessagesPage,
});
