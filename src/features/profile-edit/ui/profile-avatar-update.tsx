import { Box, Button, Card, FileUpload, useDisclosure, useFileUpload } from '@chakra-ui/react';

import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { useProfileAvatarDeleteMutation } from '../api/mutations/use-profile-avatar-delete-mutation';
import { useProfileAvatarUpdateMutation } from '../api/mutations/use-profile-avatar-update-mutation';

export function ProfileAvatarUpdate({ avatarUrl, username }: { avatarUrl: string | null; username: string }) {
  const deleteAvatarDisclosure = useDisclosure();
  const avatarUpdateMutation = useProfileAvatarUpdateMutation();
  const avatarDeleteMutation = useProfileAvatarDeleteMutation();

  const isPending = avatarUpdateMutation.isPending || avatarDeleteMutation.isPending;

  async function handleFileDelete() {
    await avatarDeleteMutation.mutateAsync();
    fileUpload.clearFiles();
    deleteAvatarDisclosure.onClose();
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
      <ConfirmDialog
        text="Are you sure you want to delete your avatar?"
        disclosure={deleteAvatarDisclosure}
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
        <Button onClick={deleteAvatarDisclosure.onOpen} disabled={isPending || file == null} colorPalette="red">
          Delete
        </Button>
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
