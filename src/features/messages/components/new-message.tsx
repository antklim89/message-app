import { EditMessage } from './form/edit-message';
import { EditMessageAccordion } from './ui/edit-message-accordion';
import { useCreateMessage } from '../hooks/mutations/useCreateMessage';
import type { MessageEditSchema } from '../schemas';

export function NewMessage() {
  const { mutateAsync } = useCreateMessage();

  function handleNewMessage(data: MessageEditSchema) {
    return mutateAsync(data);
  }

  return (
    <EditMessageAccordion>
      <EditMessage onSubmit={handleNewMessage} />
    </EditMessageAccordion>
  );
}
