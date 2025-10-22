import { Button, useDialogContext } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { Dialog } from '@/shared/ui/dialog';
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
      <Dialog.Title>Update Message</Dialog.Title>
      <Dialog.Body>
        <MessageEditForm value={message.body} ref={ref} onEnterKeyDown={handleSubmit} />
      </Dialog.Body>

      <Dialog.Footer>
        <Button onClick={handleSubmit} loading={messageUpdateMutation.isPending} loadingText="Updating...">
          Update
        </Button>
      </Dialog.Footer>
    </>
  );
}
