import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageCardFallback } from '@/widgets/message-card';
import { MessageListFallback } from '@/widgets/message-list';
import { FavoriteMessagesLayout } from './favorite-messages-layout';

export function FavoriteMessagesPage() {
  return (
    <SuspenseErrorBoundary
      fallback={
        <MessageListFallback>
          <MessageCardFallback />
        </MessageListFallback>
      }
    >
      <FavoriteMessagesLayout />
    </SuspenseErrorBoundary>
  );
}
