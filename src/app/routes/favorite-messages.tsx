import { createFileRoute } from '@tanstack/react-router';

import { FavoriteMessagesPage } from '@/pages/favorite-messages';

export const Route = createFileRoute('/favorite-messages')({
  component: FavoriteMessagesPage,
});
