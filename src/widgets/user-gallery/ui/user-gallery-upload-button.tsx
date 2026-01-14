import { Button, Skeleton } from '@chakra-ui/react';

import { GalleryUploadButton } from '@/features/gallery-edit';
import { Protected } from '@/shared/ui/protected';

export function UserGalleryUploadButton({ profileId }: { profileId: string }) {
  return (
    <Protected
      fallback={
        <Skeleton asChild>
          <Button w="full" my={4}>
            Upload
          </Button>
        </Skeleton>
      }
      authorId={profileId}
      privateElement={<GalleryUploadButton authorId={profileId} w="full" my={4} />}
    />
  );
}
