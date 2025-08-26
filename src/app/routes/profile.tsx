import { createFileRoute } from '@tanstack/react-router';

import { ProfileRoot } from '@/pages/profile';

export const Route = createFileRoute('/profile')({
  component: ProfileRoot,
});
