import { Button, type ButtonProps, FileUpload } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa6';

import { useGalleryUploadMutation } from '../api/mutations/gallery-upload-mutation';
import { useGalleryImageUpload } from '../lib/hooks/use-gallery-image-upload';

export function GalleryUploadButton({ authorId, ...props }: ButtonProps & { authorId: string }) {
  const mutation = useGalleryUploadMutation({ authorId });

  const upload = useGalleryImageUpload({
    async onUpload(files) {
      await mutation.mutateAsync(files);
    },
  });

  return (
    <FileUpload.RootProvider value={upload}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button loading={mutation.isPending} {...props}>
          <FaUpload /> UPLOAD
        </Button>
      </FileUpload.Trigger>
    </FileUpload.RootProvider>
  );
}
