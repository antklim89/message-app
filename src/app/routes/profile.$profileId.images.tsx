import { createFileRoute } from '@tanstack/react-router';

import { ProfileImagesPage } from '@/pages/profile-images';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/profile/$profileId/images')({
  component: () => {
    const params = Route.useParams();
    return <ProfileImagesPage params={params} />;
  },
  errorComponent: ErrorComponent,
});
