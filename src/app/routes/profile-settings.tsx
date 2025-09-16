import { createFileRoute } from '@tanstack/react-router';

import { ProfileSettingsPage } from '@/pages/profile-settings';
import { PageErrorComponent } from '@/shared/ui/page-error-component';

export const Route = createFileRoute('/profile-settings')({
  component: ProfileSettingsPage,
  errorComponent: PageErrorComponent,
});
