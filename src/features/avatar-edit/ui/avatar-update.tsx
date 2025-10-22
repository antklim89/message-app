import { Box, Button, Card, FileUpload, useDialog, useFileUpload } from '@chakra-ui/react';

import { Modal } from '@/shared/ui/modal';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { useAvatarDeleteMutation } from '../api/mutations/use-avatar-delete-mutation';
import { useAvatarUpdateMutation } from '../api/mutations/use-avatar-update-mutation';

export function AvatarUpdate({ avatarUrl, username }: { avatarUrl: string | null; username: string }) {
  const deleteAvatarDialog = useDialog();
  const avatarUpdateMutation = useAvatarUpdateMutation();
  const avatarDeleteMutation = useAvatarDeleteMutation();

  const isPending = avatarUpdateMutation.isPending || avatarDeleteMutation.isPending;

  async function handleFileDelete() {
    await avatarDeleteMutation.mutateAsync();
    fileUpload.clearFiles();
    deleteAvatarDialog.setOpen(false);
  }
  const fileUpload = useFileUpload({
    maxFiles: 1,
  });
  const file = fileUpload.acceptedFiles[0];

  async function handleFileUpload() {
    if (!file) return null;
    await avatarUpdateMutation.mutateAsync(file);
    fileUpload.clearFiles();
  }

  return (
    <Card.Root>
      <Modal.Root dialog={deleteAvatarDialog}>
        <Modal.Title fontSize="xl">Are you sure you want to delete your avatar?</Modal.Title>
        <Modal.Body>
          <Button
            disabled={isPending || file == null}
            colorPalette="red"
            loading={avatarDeleteMutation.isPending}
            loadingText="Deleting..."
            onClick={handleFileDelete}
          >
            Delete
          </Button>
        </Modal.Body>
      </Modal.Root>
      <Card.Body>
        <FileUpload.RootProvider value={fileUpload}>
          <FileUpload.HiddenInput disabled={isPending} />

          <FileUpload.Dropzone cursor="pointer" width="full">
            <FileUpload.DropzoneContent>
              <UserAvatar
                w="12rem"
                h="12rem"
                fontSize="6rem"
                src={file ? URL.createObjectURL(file) : avatarUrl}
                username={username}
              />
              <Box>Drag and drop files or click here to upload your new avatar.</Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
        </FileUpload.RootProvider>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button disabled={isPending || file == null} variant="ghost" onClick={() => fileUpload.clearFiles()}>
          Cancel
        </Button>
        <Modal.Trigger dialog={deleteAvatarDialog} disabled={isPending || file == null} colorPalette="red">
          Delete
        </Modal.Trigger>
        <Button
          disabled={isPending || file == null}
          loading={avatarUpdateMutation.isPending}
          loadingText="Saving..."
          onClick={handleFileUpload}
        >
          Save
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
