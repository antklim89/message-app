import { Badge, Box, Button, HStack, Image, Separator, SimpleGrid } from '@chakra-ui/react';

import { useInfiniteScroll } from '@/shared/hooks/use-infinity-scroll';
import { useSupabase } from '@/shared/lib/supabase';
import { GalleryContentEmpty } from './gallery-content-empty';
import { GalleryContentFallback } from './gallery-content-fallback';
import type { GalleryImage } from '../model/types';

export function GalleryContent({
  images,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onImageClick,
}: {
  images: GalleryImage[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onImageClick: (imageUrl: string) => void;
}) {
  const supabase = useSupabase();

  const ref = useInfiniteScroll({
    loadMore: hasNextPage ? fetchNextPage : undefined,
    rootMargin: '100px',
  });

  const groupedImageUrls = images.reduce((acc, image) => {
    const imageUrl = supabase.storage.from('gallery').getPublicUrl(image.url).data.publicUrl;
    const date = new Date(image.createdAt).toLocaleDateString();
    const mapItem = acc.get(date);
    if (mapItem != null) mapItem.push(imageUrl);
    else acc.set(date, [imageUrl]);
    return acc;
  }, new Map<string, string[]>());

  if (images.length === 0) return <GalleryContentEmpty />;
  return (
    <Box>
      {Array.from(groupedImageUrls.entries(), ([date, imageUrls]) => (
        <Box key={date}>
          <HStack my={4}>
            <Separator w="full" />
            <Badge variant="outline" size="lg">
              {date}
            </Badge>
          </HStack>
          <SimpleGrid columns={{ base: 4, smDown: 2 }} gap={1}>
            {imageUrls.map(imageUrl => (
              <Button
                cursor="pointer"
                onClick={() => onImageClick(imageUrl)}
                unstyled
                key={imageUrl}
                data-id={imageUrl}
              >
                <Image borderRadius="lg" width="full" aspectRatio="portrait" src={imageUrl} alt="gallery" />
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      ))}
      {isFetchingNextPage && <GalleryContentFallback />}
      {hasNextPage && <div ref={ref} style={{ height: 100, marginTop: -100 }} />}
    </Box>
  );
}
