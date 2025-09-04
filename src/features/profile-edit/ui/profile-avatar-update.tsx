import { Box, Button, Card, FileUpload, useDisclosure, useFileUpload } from '@chakra-ui/react';

import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { useProfileAvatarDeleteMutation } from '../api/mutations/use-profile-avatar-delete-mutation';
import { useProfileAvatarUpdateMutation } from '../api/mutations/use-profile-avatar-update-mutation';

export function ProfileAvatarUpdate({ avatarUrl, username }: { avatarUrl: string | null; username: string }) {
  const disclosure = useDisclosure();
  const avatarUpdateMutation = useProfileAvatarUpdateMutation();
  const avatarDeleteMutation = useProfileAvatarDeleteMutation();

  const isPending = avatarUpdateMutation.isPending || avatarDeleteMutation.isPending;

  async function handleFileDelete() {
    await avatarDeleteMutation.mutateAsync();
    fileUpload.clearFiles();
    disclosure.onClose();
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
      <Card.Body>
        <FileUpload.RootProvider value={fileUpload}>
          <FileUpload.HiddenInput disabled={isPending} />

          <FileUpload.Dropzone cursor="pointer" width="full">
            <FileUpload.DropzoneContent>
              <UserAvatar size={12} src={file ? URL.createObjectURL(file) : avatarUrl} username={username} />
              <Box>Drag and drop files or click here to upload your new avatar.</Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
        </FileUpload.RootProvider>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button disabled={isPending || file == null} variant="ghost" onClick={() => fileUpload.clearFiles()}>
          Cancel
        </Button>

        <ConfirmDialog
          {...disclosure}
          text="Are you sure you want to delete your avatar?"
          openElement={
            <Button disabled={isPending || file == null} colorPalette="red">
              Delete
            </Button>
          }
          confirmElement={
            <Button
              disabled={isPending || file == null}
              colorPalette="red"
              loading={avatarDeleteMutation.isPending}
              loadingText="Deleting..."
              onClick={handleFileDelete}
            >
              Delete
            </Button>
          }
        />
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
