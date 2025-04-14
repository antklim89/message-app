import { createFileRoute } from '@tanstack/react-router';

import { NewMessage } from '@/features/messages';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <NewMessage />
    </div>
  );
}
