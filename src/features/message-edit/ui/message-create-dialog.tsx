import { Button, type useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { useAppForm } from '@/shared/lib/react-form';
import { Modal } from '@/shared/ui/form-dialog';
import { MessageEditForm, messageEditFormOptions } from './message-edit-form';
import { useMessageCreateMutation } from '../api/mutations/use-message-create-mutation';

export function MessageCreateDialog({
  answerId,
  disclosure,
}: {
  answerId: MessageType['answerId'];
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  const messageEditForm = useAppForm({
    ...messageEditFormOptions,
    async onSubmit({ formApi, value }) {
      const result = await messageCreateMutation.mutateAsync(value);
      if (result.success) {
        disclosure.onClose();
        formApi.reset();
      } else {
        formApi.setErrorMap({
          onSubmit: { fields: result.error.issues ?? {}, form: result.error.message },
        });
      }
    },
  });

  return (
    <Modal
      disclosure={disclosure}
      submitElement={
        <Button
          onClick={messageEditForm.handleSubmit}
          loading={messageCreateMutation.isPending}
          loadingText="Creating..."
        >
          Create
        </Button>
      }
      title="Create New Message"
    >
      <MessageEditForm form={messageEditForm} />
    </Modal>
  );
}
