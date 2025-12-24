import { type InferDataFromTag, infiniteQueryOptions } from '@tanstack/react-query';

import type { GalleryPage } from '../../model/types';
import { getGalleryList } from '../repository/get-gallery-list';

export const galleryListQueryOptionsBaseKey = 'GALLERY';
export type GalleryListQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof galleryListQueryOptions>['queryFn'],
  ReturnType<typeof galleryListQueryOptions>['queryKey']
>;

export function galleryListQueryOptions({ authorId }: { authorId: string }) {
  return infiniteQueryOptions({
    queryKey: [galleryListQueryOptionsBaseKey, { authorId }],
    getNextPageParam(data: GalleryPage) {
      return data.nextCursor;
    },
    initialPageParam: undefined as string | undefined,
    async queryFn({ pageParam: nextCursor }) {
      const { fail, error, result } = await getGalleryList({ nextCursor, authorId });
      if (fail) throw error;

      return result;
    },
    select(data) {
      return data.pages.flatMap(i => i.images);
    },
  });
}
