import { Box, Button, Skeleton } from '@chakra-ui/react';

import { MessageFallback, useMessageQuery } from '@/entities/messages';
import { MessageCreateCollapsible } from '@/features/message-edit';
import { withSuspenseErrorBoundary } from '@/share/ui/hoc/with-suspense-error-boundary';
import { Protected } from '@/share/ui/protected';
import { MessageCard } from '@/widgets/message-card';

export const MessageAnswerLayout = withSuspenseErrorBoundary(
  ({ answerId }: { answerId: number }) => {
    const { data } = useMessageQuery({ id: answerId });
    return (
      <>
        <MessageCard message={data} />
        <Protected
          fallback={<Skeleton h={30} />}
          privateElement={
            <MessageCreateCollapsible
              answerId={answerId}
              trigger={
                <Button my={4} variant="outline">
                  Answer to this message.
                </Button>
              }
            />
          }
          publicElement={<Box h={30} />}
        />
      </>
    );
  },
  <MessageFallback />,
);
