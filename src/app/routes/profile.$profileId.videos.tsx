import { createFileRoute } from '@tanstack/react-router';

import { ProfileVideosPage } from '@/pages/profile-videos';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/profile/$profileId/videos')({
  component() {
    const params = Route.useParams();
    return <ProfileVideosPage params={params} />;
  },
  errorComponent: ErrorComponent,
});
