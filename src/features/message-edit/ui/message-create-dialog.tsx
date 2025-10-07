import { lazy, Suspense, useId } from 'react';
import { Button, type useDisclosure } from '@chakra-ui/react';
import type { SerializedRootNode } from 'lexical';

import type { MessageType } from '@/entities/messages';
import { Modal } from '@/shared/ui/modal';
import { MessageEditFormFallback } from './message-edit-form-fallback';
import { useMessageCreateMutation } from '../api/mutations/use-message-create-mutation';

const MessageEditForm = lazy(() => import('./message-edit-form').then(m => ({ default: m.MessageEditForm })));

export function MessageCreateDialog({
  answerId,
  disclosure,
}: {
  answerId: MessageType['answerId'];
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const id = useId();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  async function handleSubmit(value?: SerializedRootNode) {
    if (value == null) return;
    const result = await messageCreateMutation.mutateAsync({ body: value });
    if (result.success) {
      disclosure.onClose();
    }
  }

  return (
    <Modal
      disclosure={disclosure}
      submitElement={
        <Button form={id} type="submit" loading={messageCreateMutation.isPending} loadingText="Creating...">
          Create
        </Button>
      }
      title="Create New Message"
    >
      <Suspense fallback={<MessageEditFormFallback />}>
        <MessageEditForm onSubmit={handleSubmit} id={id} />
      </Suspense>
    </Modal>
  );
}
