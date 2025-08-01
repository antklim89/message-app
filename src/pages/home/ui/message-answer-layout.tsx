import { MessageFallback, useMessageQuery } from '@/entities/messages';
import { withSuspenseErrorBoundary } from '@/share/ui/hoc/with-suspense-error-boundary';
import { MessageCard } from '@/widgets/message-card';

export const MessageAnswerLayout = withSuspenseErrorBoundary(
  ({ answerId }: { answerId: number }) => {
    const { data } = useMessageQuery({ id: answerId });

    return <MessageCard message={data} />;
  },
  <MessageFallback />,
);
