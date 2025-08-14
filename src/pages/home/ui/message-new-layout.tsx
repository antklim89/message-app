import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';

import { MessageCreateCollapsible } from '@/features/message-edit';
import { useSession } from '@/share/hooks/use-session';
import { withSuspenseErrorBoundary } from '@/share/ui/hoc/with-suspense-error-boundary';

export const MessageNewLayout = withSuspenseErrorBoundary(
  ({ answerId }: { answerId?: number }) => {
    const { data: user } = useSession();
    const params = useParams({ from: '/answers/$answerId', shouldThrow: false });

    if (user)
      return (
        <MessageCreateCollapsible
          answerId={answerId}
          trigger={
            <Button my={4} variant="outline">
              {params == null ? 'Create new message.' : 'Answer to this message.'}
            </Button>
          }
        />
      );
    return <Box h={30} />;
  },
  <Skeleton h={30} />,
);
