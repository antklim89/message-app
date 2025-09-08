import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageListFallback } from '@/widgets/message-list';
import { FavoriteMessagesLayout } from './favorite-messages-layout';

export function FavoriteMessagesPage() {
  return (
    <SuspenseErrorBoundary fallback={<MessageListFallback />}>
      <FavoriteMessagesLayout />
    </SuspenseErrorBoundary>
  );
}
