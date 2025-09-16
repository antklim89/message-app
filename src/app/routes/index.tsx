import { createFileRoute } from '@tanstack/react-router';

import { HomePage, preloadHomePage } from '@/pages/home';
import { PageErrorComponent } from '@/shared/ui/page-error-component';

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: preloadHomePage,
  errorComponent: PageErrorComponent,
});
