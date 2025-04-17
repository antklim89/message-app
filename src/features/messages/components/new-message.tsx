import { useDisclosure } from '@chakra-ui/react';

import { EditMessage } from './form/edit-message';
import { EditMessageCollapsible } from './ui/edit-message-collapsible';
import { useCreateMessage } from '../hooks/mutations/useCreateMessage';
import type { MessageEditSchema } from '../schemas';

export function NewMessage() {
  const { mutateAsync } = useCreateMessage();
  const { onToggle, open, setOpen } = useDisclosure();

  async function handleNewMessage(data: MessageEditSchema) {
    const result = await mutateAsync(data);
    if (result.type === 'success') setOpen(false);
    return result;
  }

  return (
    <EditMessageCollapsible onToggle={onToggle} open={open}>
      <EditMessage onSubmit={handleNewMessage} />
    </EditMessageCollapsible>
  );
}
