import { useMutation } from '@tanstack/react-query';

import { galleryListQueryOptions } from '@/entities/gallery';
import { toaster } from '@/shared/lib/toaster';
import { uploadGalleryRepository } from '../repositories/upload-gallery-repository';

export function useGalleryUploadMutation({ authorId }: { authorId: string }) {
  return useMutation({
    async mutationFn(files: File[], { client }) {
      await Promise.all(
        files.map(async file => {
          const { fail, result } = await uploadGalleryRepository({ file });
          if (fail) {
            toaster.error({ description: `Failed to upload image ${file.name}` });
            return;
          }
          client.setQueryData(
            galleryListQueryOptions({ authorId }).queryKey,
            (oldData = { pageParams: [], pages: [] }) => ({
              ...oldData,
              pages: [
                { images: [{ url: result, createdAt: new Date().toISOString() }], nextCursor: undefined },
                ...oldData.pages,
              ],
            }),
          );
        }),
      );
    },
  });
}
