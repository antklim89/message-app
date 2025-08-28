import { Avatar, Box, Button, Card, FileUpload, useFileUpload } from '@chakra-ui/react';

import { useSupabasePublicUrl } from '@/shared/lib/supabase';
import { useProfileAvatarUpdateMutation } from '../api/hooks/use-profile-avatar-update-mutation';

export function ProfileAvatarUpdate({ avatarUrl }: { avatarUrl: string | null }) {
  const avatarUpdateMutation = useProfileAvatarUpdateMutation();
  const fileUpload = useFileUpload({
    maxFiles: 1,
    // maxFileSize: 3000,
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
              <Avatar.Root w={48} h={48}>
                <Avatar.Image src={file ? URL.createObjectURL(file) : avatarUrl ? fullAvatarUrl : undefined} />
                <Avatar.Fallback />
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
        <Button loading={avatarUpdateMutation.isPending} loadingText="Saving..." onClick={handleFileUpload}>
          Save
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
