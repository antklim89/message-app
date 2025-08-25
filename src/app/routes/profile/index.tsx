import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/')({
  component: () => {
    return <div>ROOT</div>;
  },
});
