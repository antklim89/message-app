import type { ReactElement } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { FormDialog } from '@/share/ui/form-dialog';
import { MessageEditForm } from './message-edit-form';
import { useMessageUpdateMutation } from '../api/hooks/use-message-update-mutation';
import type { MessageEditType } from '../model/types';

export function MessageUpdateDialog({
  message,
  trigger,
}: {
  message: MessageEditType & { id: MessageType['id'] };
  trigger: ReactElement;
}) {
  const disclosure = useDisclosure();
  const messageUpdateMutation = useMessageUpdateMutation({ messageId: message.id });

  async function handleSubmit(data: MessageEditType) {
    const result = await messageUpdateMutation.mutateAsync(data);
    if (result.success) disclosure.onClose();
    return result;
  }

  return (
    <FormDialog
      {...disclosure}
      formElement={<MessageEditForm onSubmit={handleSubmit} values={message} />}
      openElement={trigger}
      submitElement={
        <Button loading={messageUpdateMutation.isPending} loadingText="Updating...">
          Update
        </Button>
      }
      title="Update Message"
    />
  );
}
