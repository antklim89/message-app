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
  const messageEditMutation = useMessageUpdateMutation({ messageId: message.id });

  async function handleSubmit(data: MessageEditType) {
    const result = await messageEditMutation.mutateAsync(data);
    if (result.success) disclosure.onClose();
    return result;
  }

  return (
    <FormDialog
      {...disclosure}
      title="Update Message"
      openElement={trigger}
      submitElement={<Button loadingText="Saving...">Save</Button>}
      formElement={<MessageEditForm values={message} onSubmit={handleSubmit} />}
    />
  );
}
