import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageListFallback } from '@/widgets/message-list';
import { SearchLayout } from './search-layout';

export function SearchPage({ searchParams }: { searchParams: { s: string } }) {
  return (
    <SuspenseErrorBoundary fallback={<MessageListFallback />}>
      <SearchLayout search={searchParams.s} />
    </SuspenseErrorBoundary>
  );
}
