import { lazy, Suspense } from 'react';
import { Button, type useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { Modal } from '@/shared/ui/modal';
import { MessageEditFormFallback } from './fallbacks/message-edit-form-fallback';
import { useMessageCreateMutation } from '../api/mutations/use-message-create-mutation';
import { useRichTextHandler } from '../lib/hooks/use-rich-text-handler';

const MessageEditForm = lazy(() => import('./forms/message-edit-form').then(m => ({ default: m.MessageEditForm })));

export function MessageCreateDialog({
  answerId,
  disclosure,
}: {
  answerId: MessageType['answerId'];
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  const { ref, handleSubmit } = useRichTextHandler({
    async onSubmit(value) {
      if (!value) return;
      const result = await messageCreateMutation.mutateAsync({ body: value });
      if (result.success) disclosure.onClose();
    },
  });

  return (
    <Modal
      disclosure={disclosure}
      submitElement={
        <Button onClick={handleSubmit} loading={messageCreateMutation.isPending} loadingText="Creating...">
          Create
        </Button>
      }
      title="Create New Message"
    >
      <Suspense fallback={<MessageEditFormFallback />}>
        <MessageEditForm onEnterKeyDown={handleSubmit} ref={ref} />
      </Suspense>
    </Modal>
  );
}
