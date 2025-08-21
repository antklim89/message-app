import type { ReactElement } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { FormDialog } from '@/share/ui/form-dialog';
import { MessageEditForm } from './message-edit-form';
import { useMessageCreateMutation } from '../api/hooks/use-message-create-mutation';
import type { MessageEditType } from '../model/types';

export function MessageCreateDialog({
  answerId,
  trigger,
}: {
  answerId: MessageType['answerId'];
  trigger: ReactElement;
}) {
  const disclosure = useDisclosure();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  async function handleSubmit(data: MessageEditType) {
    const result = await messageCreateMutation.mutateAsync(data);
    if (result.success) disclosure.onClose();
    return result;
  }

  return (
    <FormDialog
      {...disclosure}
      formElement={<MessageEditForm onSubmit={handleSubmit} />}
      openElement={trigger}
      submitElement={
        <Button loading={messageCreateMutation.isPending} loadingText="Creating...">
          Create
        </Button>
      }
      title="Create New Message"
    />
  );
}
