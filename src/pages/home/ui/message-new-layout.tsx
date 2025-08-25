import { Box, Button, Skeleton } from '@chakra-ui/react';

import { MessageCreateCollapsible } from '@/features/message-edit';
import { Protected } from '@/shared/ui/protected';

export const MessageNewLayout = ({ answerId }: { answerId?: number }) => {
  return (
    <Protected
      fallback={<Skeleton h={30} />}
      privateElement={
        <MessageCreateCollapsible
          answerId={answerId}
          trigger={
            <Button my={4} variant="outline">
              Create new message.
            </Button>
          }
        />
      }
      publicElement={<Box h={30} />}
    />
  );
};
