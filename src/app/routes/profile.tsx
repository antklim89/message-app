import { createFileRoute } from '@tanstack/react-router';

import { ProfileRoot } from '@/pages/profile';
import { PageErrorComponent } from '@/shared/ui/page-error-component';

export const Route = createFileRoute('/profile')({
  component: ProfileRoot,
  errorComponent: PageErrorComponent,
});
