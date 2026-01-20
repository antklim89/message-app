import { Flex, type UseDialogReturn } from '@chakra-ui/react';

import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';
import { Dialog } from '@/shared/ui/dialog';
import { ErrorComponent } from '@/shared/ui/error-component';
import { MessageEditImageDialogContent } from './message-edit-image-dialog-content';
import { GalleryUploadButton } from '../@x/gallery-edit';

export function MessageEditImageDialog({
  dialog,
  selectedImages,
  onChange,
}: {
  dialog: UseDialogReturn;
  selectedImages: string[];
  onChange: (selectedImages: string[]) => void;
}) {
  const { user } = useSession();

  if (!user) return <ErrorComponent error={errAuthentication().error} />;
  return (
    <Dialog.Root scrollBehavior="inside" dialog={dialog}>
      <Dialog.Title>Chose images to add</Dialog.Title>
      <Flex px={8} justifyContent="center" mb={4}>
        <GalleryUploadButton authorId={user.id} width="full" />
      </Flex>
      <MessageEditImageDialogContent user={user} onChange={onChange} selectedImages={selectedImages} />
    </Dialog.Root>
  );
}
