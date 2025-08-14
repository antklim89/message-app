import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';

import { MessageCreateCollapsible } from '@/features/message-edit';
import { Protected } from '@/share/ui/protected';

export const MessageNewLayout = ({ answerId }: { answerId?: number }) => {
  const params = useParams({ from: '/answers/$answerId', shouldThrow: false });

  return (
    <Protected
      privateElement={
        <MessageCreateCollapsible
          answerId={answerId}
          trigger={
            <Button my={4} variant="outline">
              {params == null ? 'Create new message.' : 'Answer to this message.'}
            </Button>
          }
        />
      }
      publicElement={<Box h={30} />}
      fallback={<Skeleton h={30} />}
    />
  );
};
