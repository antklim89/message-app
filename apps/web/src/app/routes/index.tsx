import { lazy } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Dialog } from '@message-app/ui/components/dialog';
import { createFileRoute } from '@tanstack/react-router';
import { FaMessage } from 'react-icons/fa6';

import { MessageCreateDialogFallback } from '@/features/message-create';

const MessageCreateDialogContent = lazy(() =>
  import('@/features/message-create').then(m => ({
    default: m.MessageCreateDialog,
  })),
);

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <Box>
      <Dialog.Root
        trigger={
          <Button w="full">
            Create New Message
            <FaMessage />
          </Button>
        }
        fallback={<MessageCreateDialogFallback />}
      >
        <MessageCreateDialogContent answerId={undefined} />
      </Dialog.Root>
    </Box>
  );
}
