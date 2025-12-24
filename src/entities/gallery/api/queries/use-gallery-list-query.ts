import { type InferDataFromTag, infiniteQueryOptions } from '@tanstack/react-query';

import { getGalleryList } from '../repository/get-gallery-list';

export const galleryListQueryOptionsBaseKey = 'GALLERY';
export type GalleryListQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof galleryListQueryOptions>['queryFn'],
  ReturnType<typeof galleryListQueryOptions>['queryKey']
>;

export function galleryListQueryOptions() {
  return infiniteQueryOptions({
    queryKey: [galleryListQueryOptionsBaseKey],
    getNextPageParam(data: { nextCursor?: string; urls: string[] }) {
      return data.nextCursor;
    },
    initialPageParam: undefined as string | undefined,
    async queryFn({ pageParam: nextCursor }) {
      const { fail, error, result } = await getGalleryList({ nextCursor });
      if (fail) throw error;

      return result;
    },
    select(data) {
      return data.pages.flat();
    },
  });
}
