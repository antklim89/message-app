import { Button, useDialogContext } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { Modal } from '@/shared/ui/modal';
import { useMessageUpdateMutation } from '../../api/mutations/use-message-update-mutation';
import { useRichTextHandler } from '../../lib/hooks/use-rich-text-handler';
import type { MessageEditType } from '../../model/types';
import { MessageEditForm } from '../forms/message-edit-form';

export function MessageUpdateDialogContent({ message }: { message: MessageEditType & { id: MessageType['id'] } }) {
  const dialog = useDialogContext();
  const messageUpdateMutation = useMessageUpdateMutation({ messageId: message.id });

  const { ref, handleSubmit } = useRichTextHandler({
    async onSubmit(value) {
      if (!value) return;
      const result = await messageUpdateMutation.mutateAsync({ body: value });
      if (result.success) dialog.setOpen(false);
    },
  });

  return (
    <>
      <Modal.Title>Update Message</Modal.Title>
      <Modal.Body>
        <MessageEditForm value={message.body} ref={ref} onEnterKeyDown={handleSubmit} />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleSubmit} loading={messageUpdateMutation.isPending} loadingText="Updating...">
          Update
        </Button>
      </Modal.Footer>
    </>
  );
}
