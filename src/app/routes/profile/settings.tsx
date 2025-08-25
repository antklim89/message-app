import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/settings')({
  component() {
    return <div>SETTINGS</div>;
  },
});
