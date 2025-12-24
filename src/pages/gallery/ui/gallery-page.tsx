import { useInfiniteQuery } from '@tanstack/react-query';
import { ErrorComponent } from '@tanstack/react-router';

import { GalleryContentFallback, galleryListQueryOptions } from '@/entities/gallery';
import { UserGallery, UserGalleryContent, UserGalleryUploadButton } from '@/widgets/user-gallery';

export function GalleryPage({ params }: { params: { profileId: string } }) {
  const galleryListQuery = useInfiniteQuery(galleryListQueryOptions({ authorId: params.profileId }));

  if (galleryListQuery.isError) return <ErrorComponent error={galleryListQuery.error} />;

  return (
    <UserGallery
      uploadButton={<UserGalleryUploadButton profileId={params.profileId} />}
      content={
        galleryListQuery.isPending ? (
          <GalleryContentFallback />
        ) : (
          <UserGalleryContent images={galleryListQuery.data} {...galleryListQuery} />
        )
      }
    />
  );
}
