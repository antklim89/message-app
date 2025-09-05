import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageCardFallback } from '@/widgets/message-card';
import { MessageListFallback } from '@/widgets/message-list';
import { SearchLayout } from './search-layout';

export function SearchPage({ searchParams }: { searchParams: { s: string } }) {
  return (
    <SuspenseErrorBoundary
      fallback={
        <MessageListFallback>
          <MessageCardFallback />
        </MessageListFallback>
      }
    >
      <SearchLayout search={searchParams.s} />
    </SuspenseErrorBoundary>
  );
}
