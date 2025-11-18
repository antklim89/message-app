import { Box, Button, Card, FileUpload, useDialog, useFileUpload } from '@chakra-ui/react';

import { Dialog } from '@/shared/ui/dialog';
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
  const [acceptedFile] = fileUpload.acceptedFiles;

  async function handleFileUpload() {
    if (!acceptedFile) return null;
    await avatarUpdateMutation.mutateAsync(acceptedFile);
    fileUpload.clearFiles();
  }

  return (
    <Card.Root>
      <Dialog.Root dialog={deleteAvatarDialog}>
        <Dialog.Title fontSize="xl">Are you sure you want to delete your avatar?</Dialog.Title>
        <Dialog.Footer>
          <Button
            disabled={isPending || avatarUrl == null}
            colorPalette="red"
            loading={avatarDeleteMutation.isPending}
            loadingText="Deleting..."
            onClick={handleFileDelete}
          >
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog.Root>
      <Card.Body>
        <FileUpload.RootProvider value={fileUpload}>
          <FileUpload.HiddenInput disabled={isPending} />

          <FileUpload.Dropzone cursor="pointer" width="full">
            <FileUpload.Trigger>
              <UserAvatar
                w="12rem"
                h="12rem"
                fontSize="6rem"
                src={acceptedFile ? URL.createObjectURL(acceptedFile) : avatarUrl}
                username={username}
              />
              <Box>Drag and drop files or click here to upload your new avatar.</Box>
            </FileUpload.Trigger>
          </FileUpload.Dropzone>
        </FileUpload.RootProvider>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button disabled={isPending || acceptedFile == null} variant="ghost" onClick={() => fileUpload.clearFiles()}>
          Cancel
        </Button>

        <Dialog.Trigger dialog={deleteAvatarDialog} disabled={isPending || avatarUrl == null} colorPalette="red">
          Delete
        </Dialog.Trigger>
        <Button
          disabled={isPending || acceptedFile == null}
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
