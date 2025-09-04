import { createFileRoute } from '@tanstack/react-router';

import { ProfileRoot, preloadProfilePage } from '@/pages/profile';

export const Route = createFileRoute('/profile')({
  component: ProfileRoot,
  loader: preloadProfilePage,
});
