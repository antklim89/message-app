import { useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { MessageEdit } from './message-edit';
import { MessageEditCollapsible } from './message-edit-collapsible';
import { useMessageCreateMutation } from '../api/hooks/use-message-create-mutation';
import type { MessageEditSchema } from '../model/schemas';

export function MessageNew({ answerToId }: { answerToId?: MessageType['answerToId'] }) {
  const { mutateAsync } = useMessageCreateMutation({ answerToId });
  const { onToggle, open, setOpen } = useDisclosure();

  async function handleNewMessage(data: MessageEditSchema) {
    const result = await mutateAsync(data);
    if (result.success) setOpen(false);
    return result;
  }

  return (
    <MessageEditCollapsible onToggle={onToggle} open={open}>
      <MessageEdit onSubmit={handleNewMessage} />
    </MessageEditCollapsible>
  );
}
