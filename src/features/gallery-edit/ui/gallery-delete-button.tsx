import { Button, type ButtonProps, Icon, useDialog } from '@chakra-ui/react';
import { FaTriangleExclamation } from 'react-icons/fa6';

import type { GalleryImage } from '@/entities/gallery';
import { Dialog } from '@/shared/ui/dialog';
import { useGalleryDeleteMutation } from '../api/mutations/gallery-delete-mutation';

export function GalleryDeleteButton({
  authorId,
  images,
  onSuccess,
  children,
  ...props
}: ButtonProps & { authorId: string; images: GalleryImage[]; onSuccess?: () => void }) {
  const mutation = useGalleryDeleteMutation({ authorId });
  const dialog = useDialog();

  async function handleDeleteImages() {
    await mutation.mutateAsync(images.map(i => i.url));
    onSuccess?.();
    dialog.setOpen(false);
  }

  return (
    <>
      <Dialog.Trigger dialog={dialog} loading={mutation.isPending} {...props}>
        {children}
      </Dialog.Trigger>
      <Dialog.Root dialog={dialog}>
        <Dialog.Title display="inline" textAlign="center">
          <Icon as={FaTriangleExclamation} textAlign="center" size="2xl" />
          <br />
          Are you sure you want to delete {images.length} {images.length === 1 ? 'image' : 'images'}?
        </Dialog.Title>
        <Dialog.Footer>
          <Button
            colorPalette="red"
            loadingText="Deleting..."
            loading={mutation.isPending}
            onClick={handleDeleteImages}
          >
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog.Root>
    </>
  );
}
