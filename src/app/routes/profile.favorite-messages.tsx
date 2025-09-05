import { createFileRoute } from '@tanstack/react-router';

import { FavoriteMessagesPage } from '@/pages/favorite-messages';

export const Route = createFileRoute('/profile/favorite-messages')({
  component: FavoriteMessagesPage,
});
