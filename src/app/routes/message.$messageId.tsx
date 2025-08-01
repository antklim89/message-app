import { createFileRoute } from '@tanstack/react-router';

import { messageListQueryOptions, messageQueryOptions } from '@/entities/messages';
import { MessageAnswerLayout, MessageListLayout, MessageNewLayout, parseMessageParams } from '@/pages/home';
import { ErrorComponent } from '@/share/ui/error-component';

function RouteComponent() {
  const { messageId } = Route.useParams();
  return (
    <div>
      <MessageAnswerLayout messageId={messageId} />
      <MessageNewLayout messageId={messageId} />
      <MessageListLayout messageId={messageId} />
    </div>
  );
}

export const Route = createFileRoute('/message/$messageId')({
  component: RouteComponent,
  params: {
    parse: parseMessageParams,
  },
  errorComponent: ErrorComponent,
  loader({ context, params: { messageId } }) {
    context.queryClient.ensureInfiniteQueryData(messageListQueryOptions());
    context.queryClient.ensureQueryData(messageQueryOptions({ id: messageId }));
  },
});
