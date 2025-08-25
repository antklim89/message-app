import { createFileRoute } from '@tanstack/react-router';

import { messageListQueryOptions, messageQueryOptions } from '@/entities/messages';
import { MessageAnswerLayout, MessageListLayout, parseMessageParams } from '@/pages/home';
import { ErrorComponent } from '@/shared/ui/error-component';

function RouteComponent() {
  const { answerId } = Route.useParams();
  return (
    <>
      <MessageAnswerLayout answerId={answerId} />
      <MessageListLayout answerId={answerId} />
    </>
  );
}

export const Route = createFileRoute('/(main)/answers/$answerId')({
  component: RouteComponent,
  errorComponent: ErrorComponent,
  loader({ context, params: { answerId } }) {
    context.queryClient.ensureInfiniteQueryData(messageListQueryOptions({ answerId }));
    context.queryClient.ensureQueryData(messageQueryOptions({ id: answerId }));
  },
  params: {
    parse: parseMessageParams,
  },
});
