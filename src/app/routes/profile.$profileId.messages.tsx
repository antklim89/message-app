import { createFileRoute } from '@tanstack/react-router';

import { ProfileMessagesPage, preloadMessagesPage } from '@/pages/profile-messages';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/profile/$profileId/messages')({
  component() {
    const params = Route.useParams();
    return <ProfileMessagesPage params={params} />;
  },
  loader: preloadMessagesPage,
  errorComponent: ErrorComponent,
});
