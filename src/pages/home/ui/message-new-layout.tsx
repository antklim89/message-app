import { Box, Skeleton } from '@chakra-ui/react';

import { MessageNew } from '@/features/message-edit';
import { useSession } from '@/share/hooks/use-session';
import { withSuspenseErrorBoundary } from '@/share/ui/hoc/with-suspense-error-boundary';

export const MessageNewLayout = withSuspenseErrorBoundary(
  ({ answerId }: { answerId?: number }) => {
    const { data: user } = useSession();

    if (user) return <MessageNew answerId={answerId} />;
    return <Box h={30} />;
  },
  <Skeleton h={30} />,
);
