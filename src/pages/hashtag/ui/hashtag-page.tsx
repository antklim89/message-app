import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageListFallback } from '@/widgets/message-list';
import { HashtagLayout } from './hashtag-layout';

export function HashtagPage({ params }: { params: { hashtag: string } }) {
  return (
    <SuspenseErrorBoundary fallback={<MessageListFallback />}>
      <HashtagLayout hashtag={params.hashtag} />
    </SuspenseErrorBoundary>
  );
}
