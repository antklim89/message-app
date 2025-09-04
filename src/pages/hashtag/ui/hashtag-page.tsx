import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageCardFallback } from '@/widgets/message-card';
import { MessageListFallback } from '@/widgets/message-list';
import { HashtagLayout } from './hashtag-layout';

export function HashtagPage({ params }: { params: { hashtag: string } }) {
  return (
    <SuspenseErrorBoundary
      fallback={
        <MessageListFallback>
          <MessageCardFallback />
        </MessageListFallback>
      }
    >
      <HashtagLayout hashtag={params.hashtag} />
    </SuspenseErrorBoundary>
  );
}
