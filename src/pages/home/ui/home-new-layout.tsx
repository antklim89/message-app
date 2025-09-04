import { Box, Button, Skeleton } from '@chakra-ui/react';

import { MessageCreateCollapsible } from '@/features/message-edit';
import { Protected } from '@/shared/ui/protected';

export function HomeNewLayout() {
  return (
    <Protected
      fallback={<Skeleton h={30} />}
      privateElement={
        <MessageCreateCollapsible answerId={undefined} trigger={<Button variant="outline">Add New Message.</Button>} />
      }
      publicElement={<Box h={30} />}
    />
  );
}
