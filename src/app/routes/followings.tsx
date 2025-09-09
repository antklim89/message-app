import { createFileRoute } from '@tanstack/react-router';

import { FollowingsPage } from '@/pages/followings';

export const Route = createFileRoute('/followings')({
  component: FollowingsPage,
});
