import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageListFallback } from '@/widgets/message-list';
import { ProfileMessagesLayout } from './profile-messages-layout';

export function ProfileMessagesPage({ params }: { params: { profileId: string } }) {
  return (
    <SuspenseErrorBoundary fallback={<MessageListFallback />}>
      <ProfileMessagesLayout profileId={params.profileId} />
    </SuspenseErrorBoundary>
  );
}
