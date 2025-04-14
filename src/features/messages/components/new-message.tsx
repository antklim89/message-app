import { EditMessage } from './form/edit-message';
import { EditMessageAccordion } from './ui/edit-message-accordion';
import type { MessageEditSchema } from '../schemas';
import { createMessage } from '../services';

export function NewMessage() {
  function handleNewMessage(data: MessageEditSchema) {
    return createMessage(data);
  }

  return (
    <EditMessageAccordion>
      <EditMessage onSubmit={handleNewMessage} />
    </EditMessageAccordion>
  );
}
