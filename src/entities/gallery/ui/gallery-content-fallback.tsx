import { SimpleGrid, Skeleton } from '@chakra-ui/react';

import { GALLERY_IMAGES_LIMIT } from '../config/constants';

export function GalleryContentFallback() {
  return (
    <SimpleGrid columns={{ base: 4, smDown: 2 }} gap={1}>
      {Array.from({ length: GALLERY_IMAGES_LIMIT }, () => (
        <Skeleton key={Math.random()} width="full" aspectRatio="portrait" borderRadius="lg" />
      ))}
    </SimpleGrid>
  );
}
