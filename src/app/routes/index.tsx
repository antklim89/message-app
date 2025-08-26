import { createFileRoute } from '@tanstack/react-router';

import { HomePage, preloadHomePage } from '@/pages/home';

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: preloadHomePage,
});
