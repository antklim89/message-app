import { createFileRoute } from '@tanstack/react-router';

import { ProfileTabs } from '@/pages/profile';

export const Route = createFileRoute('/profile')({
  component() {
    return <ProfileTabs />;
  },
});
