import { createFileRoute } from '@tanstack/react-router';

import { GalleryPage } from '@/pages/gallery';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/profile/$profileId/gallery')({
  component() {
    const params = Route.useParams();
    return <GalleryPage params={params} />;
  },
  errorComponent: ErrorComponent,
});
