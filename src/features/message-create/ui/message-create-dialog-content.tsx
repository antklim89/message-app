import { Button, useDialogContext } from '@chakra-ui/react';

import { useAppForm } from '@/shared/lib/react-form';
import { Dialog } from '@/shared/ui/dialog';
import { MessageEditForm, messageEditFormOptions } from './message-edit-form';
import { useMessageCreateMutation } from '../api/mutations/use-message-create-mutation';
import { useMessageImagesUpload } from '../lib/hooks/use-message-images-upload';
import { useMessageVideosUpload } from '../lib/hooks/use-message-videos-upload';

export function MessageCreateDialogContent({ answerId }: { answerId: string | undefined }) {
  const dialog = useDialogContext();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  const form = useAppForm({
    ...messageEditFormOptions,
    async onSubmit({ value }) {
      if (!value.body) return;
      const result = await messageCreateMutation.mutateAsync(value);
      if (result.success) dialog.setOpen(false);
    },
  });

  const imagesUpload = useMessageImagesUpload({
    onUpload: value => form.setFieldValue('embedded', value),
  });

  const videoUpload = useMessageVideosUpload({
    onUpload: value => form.setFieldValue('embedded', value),
  });

  const disabled = imagesUpload.transforming || videoUpload.transforming;

  return (
    <>
      <Dialog.Title>Create New Message</Dialog.Title>
      <Dialog.Body>
        <MessageEditForm form={form} imagesUpload={imagesUpload} videoUpload={videoUpload} />
      </Dialog.Body>
      <Dialog.Footer>
        <Button
          disabled={disabled}
          onClick={form.handleSubmit}
          loading={messageCreateMutation.isPending}
          loadingText="Creating..."
        >
          Create
        </Button>
      </Dialog.Footer>
    </>
  );
}
