import { createFileRoute } from '@tanstack/react-router';

import { PageErrorComponent } from '@/shared/ui/page-error-component';

function About() {
  return <div>About!</div>;
}

export const Route = createFileRoute('/about')({
  component: About,
  errorComponent: PageErrorComponent,
});
