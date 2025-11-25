import { createFileRoute } from '@tanstack/react-router';

import { HomePage, preloadHomePage } from '@/pages/home';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: preloadHomePage,
  errorComponent: ErrorComponent,
});
