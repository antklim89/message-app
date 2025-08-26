import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageCardFallback } from '@/widgets/message-card';
import { MessageListFallback } from '@/widgets/message-list';
import { HomeLayout } from './home-layout';

export function HomePage() {
  return (
    <SuspenseErrorBoundary
      fallback={
        <MessageListFallback>
          <MessageCardFallback />
        </MessageListFallback>
      }
    >
      <HomeLayout />
    </SuspenseErrorBoundary>
  );
}
