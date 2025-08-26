import { createFileRoute } from '@tanstack/react-router';

import { ProfileAside } from '@/pages/profile';

export const Route = createFileRoute('/profile/')({
  component: ProfileAside,
});
