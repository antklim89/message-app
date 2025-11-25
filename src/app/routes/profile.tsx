import { createFileRoute } from '@tanstack/react-router';

import { ProfileRoot } from '@/pages/profile';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/profile')({
  component: ProfileRoot,
  errorComponent: ErrorComponent,
});
