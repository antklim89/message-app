import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageCardFallback } from '@/widgets/message-card';
import { MessageListFallback } from '@/widgets/message-list';
import { HomeListLayout } from './home-list-layout';
import { HomeNewLayout } from './home-new-layout';

export function HomePage() {
  return (
    <>
      <HomeNewLayout />
      <SuspenseErrorBoundary
        fallback={
          <MessageListFallback>
            <MessageCardFallback />
          </MessageListFallback>
        }
      >
        <HomeListLayout />
      </SuspenseErrorBoundary>
    </>
  );
}
