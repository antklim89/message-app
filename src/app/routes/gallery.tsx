import { createFileRoute } from '@tanstack/react-router';

import { GalleryPage } from '@/pages/gallery';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
  errorComponent: ErrorComponent,
});
