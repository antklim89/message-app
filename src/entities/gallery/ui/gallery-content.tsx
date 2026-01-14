import { Badge, Box, Button, Checkbox, HStack, Image, Separator, SimpleGrid } from '@chakra-ui/react';

import { useInfiniteScroll } from '@/shared/hooks/use-infinity-scroll';
import { useSupabase } from '@/shared/lib/supabase';
import { GalleryContentEmpty } from './gallery-content-empty';
import { GalleryContentFallback } from './gallery-content-fallback';
import type { GalleryImage } from '../model/types';

export function GalleryContent({
  images,
  selectedImages,
  onImageSelect,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onImageClick,
}: {
  images: GalleryImage[];
  selectedImages: GalleryImage[];
  onImageSelect: (imageUrl: GalleryImage[]) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onImageClick: (imageUrl: GalleryImage) => void;
}) {
  const supabase = useSupabase();

  const ref = useInfiniteScroll({
    loadMore: hasNextPage ? fetchNextPage : undefined,
    rootMargin: '100px',
  });

  const groupedImageUrls = images.reduce((acc, image) => {
    const date = new Date(image.createdAt).toLocaleDateString();
    const mapItem = acc.get(date);
    if (mapItem != null) mapItem.push(image);
    else acc.set(date, [image]);
    return acc;
  }, new Map<string, GalleryImage[]>());

  if (images.length === 0) return <GalleryContentEmpty />;
  return (
    <Box>
      {Array.from(groupedImageUrls.entries(), ([date, imageUrls]) => (
        <Box key={date}>
          <HStack my={4}>
            <Separator w="full" />
            <Checkbox.Root
              size="lg"
              checked={imageUrls.every(imageUrl => selectedImages.includes(imageUrl))}
              onClick={e => {
                e.stopPropagation();
                onImageSelect(imageUrls);
              }}
            >
              <Checkbox.Control />
            </Checkbox.Root>
            <Badge variant="outline" size="lg">
              {date}
            </Badge>
          </HStack>
          <SimpleGrid columns={{ base: 4, smDown: 2 }} gap={1}>
            {imageUrls.map(imageUrl => (
              <Button
                onClick={() => onImageClick(imageUrl)}
                cursor="pointer"
                unstyled
                key={imageUrl.url}
                position="relative"
                data-id={imageUrl.url}
              >
                <Checkbox.Root
                  size="lg"
                  position="absolute"
                  top={5}
                  right={5}
                  checked={selectedImages.includes(imageUrl)}
                  onClick={e => {
                    e.stopPropagation();
                    onImageSelect([imageUrl]);
                  }}
                >
                  <Checkbox.Control />
                </Checkbox.Root>
                <Image
                  borderRadius="lg"
                  width="full"
                  aspectRatio="portrait"
                  src={supabase.storage.from('gallery').getPublicUrl(imageUrl.url).data.publicUrl}
                  alt="gallery"
                />
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
