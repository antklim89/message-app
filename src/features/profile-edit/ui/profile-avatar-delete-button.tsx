import { Button, useDisclosure } from '@chakra-ui/react';

import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { useProfileAvatarDeleteMutation } from '../api/hooks/use-profile-avatar-delete-mutation';

export function ProfileAvatarDeleteButton({ onDelete }: { onDelete: () => void }) {
  const disclosure = useDisclosure();
  const avatarDeleteMutation = useProfileAvatarDeleteMutation();

  async function handleFileDelete() {
    await avatarDeleteMutation.mutateAsync();
    onDelete();
  }

  return (
    <ConfirmDialog
      {...disclosure}
      text="Are you sure you want to delete your avatar?"
      openElement={<Button colorPalette="red">Delete</Button>}
      confirmElement={
        <Button
          colorPalette="red"
          loading={avatarDeleteMutation.isPending}
          loadingText="Deleting..."
          onClick={handleFileDelete}
        >
          Delete
        </Button>
      }
    />
  );
}
