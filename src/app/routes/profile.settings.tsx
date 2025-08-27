import { createFileRoute } from '@tanstack/react-router';

import { ProfileSettingsPage } from '@/pages/profile';

export const Route = createFileRoute('/profile/settings')({
  component: ProfileSettingsPage,
});
