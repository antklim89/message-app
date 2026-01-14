import { useMutation } from '@tanstack/react-query';

import { galleryListQueryOptions, galleryListQueryOptionsBaseKey } from '@/entities/gallery';
import { toaster } from '@/shared/lib/toaster';
import { deleteGalleryRepository } from '../repositories/delete-gallery-repository';

export function useGalleryDeleteMutation({ authorId }: { authorId: string }) {
  return useMutation({
    async mutationFn(paths: string[]) {
      const deleteGalleryResult = await deleteGalleryRepository({ paths });

      return deleteGalleryResult;
    },
    onSuccess({ fail, error }, paths, _onMutateResult, { client }) {
      if (fail) {
        toaster.error({ title: 'Failed to delete image', description: error.message });
        client.invalidateQueries({ queryKey: [galleryListQueryOptionsBaseKey] });
        return;
      }

      toaster.success({ title: 'Success', description: 'Images deleted successfully' });
      client.setQueryData(
        galleryListQueryOptions({ authorId }).queryKey,
        (oldData = { pageParams: [], pages: [] }) => ({
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            images: page.images.filter(image => !paths.includes(image.url)),
          })),
        }),
      );
    },
  });
}
