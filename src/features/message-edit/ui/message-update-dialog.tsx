import { lazy, Suspense, useId } from 'react';
import { Button, type useDisclosure } from '@chakra-ui/react';
import type { SerializedRootNode } from 'lexical';

import type { MessageType } from '@/entities/messages';
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
  const id = useId();
  const messageUpdateMutation = useMessageUpdateMutation({ messageId: message.id });

  async function handleSubmit(value?: SerializedRootNode) {
    if (value == null) return;
    const result = await messageUpdateMutation.mutateAsync({ body: value });
    if (result.success) {
      disclosure.onClose();
    }
  }

  return (
    <Modal
      disclosure={disclosure}
      submitElement={
        <Button form={id} loading={messageUpdateMutation.isPending} loadingText="Updating..." type="submit">
          Update
        </Button>
      }
      title="Update Message"
    >
      <Suspense fallback={<MessageEditFormFallback />}>
        <MessageEditForm value={message.body} onSubmit={handleSubmit} id={id} />
      </Suspense>
    </Modal>
  );
}
