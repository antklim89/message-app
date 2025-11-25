import { createFileRoute } from '@tanstack/react-router';

import { ErrorComponent } from '@/shared/ui/error-component';

function About() {
  return <div>About!</div>;
}

export const Route = createFileRoute('/about')({
  component: About,
  errorComponent: ErrorComponent,
});
