import { lazy, Suspense } from 'react';
import { Button, type useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { useRichTextHandler } from '@/shared/lib/lexical/use-rich-text-handler';
import { Modal } from '@/shared/ui/modal';
import { MessageEditFormFallback } from './message-edit-form-fallback';
import { useMessageUpdateMutation } from '../api/mutations/use-message-update-mutation';
import type { MessageEditType } from '../model/types';

const MessageEditForm = lazy(() => import('./message-edit-form').then(m => ({ default: m.MessageEditForm })));

export function MessageUpdateDialog({
  message,
  disclosure,
}: {
  message: MessageEditType & { id: MessageType['id'] };
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const messageUpdateMutation = useMessageUpdateMutation({ messageId: message.id });

  const { ref, handleSubmit } = useRichTextHandler({
    async onSubmit(value) {
      if (!value) return;
      const result = await messageUpdateMutation.mutateAsync({ body: value });
      if (result.success) disclosure.onClose();
    },
  });

  return (
    <Modal
      disclosure={disclosure}
      submitElement={
        <Button onClick={handleSubmit} loading={messageUpdateMutation.isPending} loadingText="Updating...">
          Update
        </Button>
      }
      title="Update Message"
    >
      <Suspense fallback={<MessageEditFormFallback />}>
        <MessageEditForm value={message.body} ref={ref} />
      </Suspense>
    </Modal>
  );
}
