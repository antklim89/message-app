import { createFileRoute } from '@tanstack/react-router';

import { ProfileSettingsPage } from '@/pages/profile-settings';

export const Route = createFileRoute('/profile-settings')({
  component: ProfileSettingsPage,
});
