import { useMutation } from '@tanstack/react-query';

import { galleryListQueryOptions } from '@/entities/gallery';
import { toaster } from '@/shared/lib/toaster';
import { uploadGalleryRepository } from '../repositories/upload-gallery-repository';

export function useGalleryUploadMutation() {
  return useMutation({
    async mutationFn(files: File[], { client }) {
      await Promise.all(
        files.map(async file => {
          const { fail, result } = await uploadGalleryRepository({ file });
          if (fail) {
            toaster.error({ description: `Failed to upload image ${file.name}` });
            return;
          }
          client.setQueryData(galleryListQueryOptions().queryKey, (oldData = { pageParams: [], pages: [] }) => ({
            ...oldData,
            pages: [{ urls: [result] }, ...oldData.pages],
          }));
        }),
      );
    },
  });
}
