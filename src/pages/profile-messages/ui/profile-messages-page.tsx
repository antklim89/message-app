import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageCardFallback } from '@/widgets/message-card';
import { MessageListFallback } from '@/widgets/message-list';
import { ProfileMessagesLayout } from './profile-messages-layout';

export function ProfileMessagesPage({ params }: { params: { profileId: string } }) {
  return (
    <SuspenseErrorBoundary
      fallback={
        <MessageListFallback>
          <MessageCardFallback />
        </MessageListFallback>
      }
    >
      <ProfileMessagesLayout profileId={params.profileId} />
    </SuspenseErrorBoundary>
  );
}
