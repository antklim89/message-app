import { createFileRoute } from '@tanstack/react-router';

import { ProfileSettingsPage } from '@/pages/profile-settings';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/profile-settings')({
  component: ProfileSettingsPage,
  errorComponent: ErrorComponent,
});
