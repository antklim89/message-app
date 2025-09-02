import { Avatar, Box, Button, Card, FileUpload, useFileUpload } from '@chakra-ui/react';

import { useSupabasePublicUrl } from '@/shared/lib/supabase';
import { ProfileAvatarDeleteButton } from './profile-avatar-delete-button';
import { useProfileAvatarUpdateMutation } from '../api/hooks/use-profile-avatar-update-mutation';

export function ProfileAvatarUpdate({ avatarUrl }: { avatarUrl: string | null }) {
  const avatarUpdateMutation = useProfileAvatarUpdateMutation();
  const fileUpload = useFileUpload({
    maxFiles: 1,
  });
  const file = fileUpload.acceptedFiles[0];

  async function handleFileUpload() {
    if (!file) return null;
    await avatarUpdateMutation.mutateAsync(file);
  }

  const fullAvatarUrl = useSupabasePublicUrl(avatarUrl);

  return (
    <Card.Root>
      <Card.Body>
        <FileUpload.RootProvider value={fileUpload}>
          <FileUpload.HiddenInput />

          <FileUpload.Dropzone cursor="pointer" width="full">
            <FileUpload.DropzoneContent>
              <Avatar.Root w="12rem" h="12rem">
                <Avatar.Image src={file ? URL.createObjectURL(file) : avatarUrl ? fullAvatarUrl : undefined} />
                <Avatar.Fallback fontSize="6rem" />
              </Avatar.Root>
              <Box>Drag and drop files or click here to upload your new avatar.</Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
        </FileUpload.RootProvider>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="ghost" onClick={() => fileUpload.clearFiles()}>
          Cancel
        </Button>
        {avatarUrl != null && <ProfileAvatarDeleteButton onDelete={fileUpload.clearFiles} />}
        <Button loading={avatarUpdateMutation.isPending} loadingText="Saving..." onClick={handleFileUpload}>
          Save
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
