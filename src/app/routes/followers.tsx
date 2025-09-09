import { createFileRoute } from '@tanstack/react-router';

import { FollowersPage } from '@/pages/followers';

export const Route = createFileRoute('/followers')({
  component: FollowersPage,
});
