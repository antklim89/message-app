import { Box, Button, Flex, Icon, Image, Skeleton } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FaCheck } from 'react-icons/fa6';

import { galleryListQueryOptions } from '@/entities/gallery';
import { useInfiniteScroll } from '@/shared/hooks/use-infinity-scroll';
import { useSupabase } from '@/shared/lib/supabase';
import type { User } from '@/shared/model/user';
import { Dialog } from '@/shared/ui/dialog';
import { MAX_SELECTED_IMAGES } from '../config/constants';

export function MessageEditImageDialogContent({
  user,
  onChange,
  selectedImages,
}: {
  user: User;
  selectedImages: string[];
  onChange: (selectedImages: string[]) => void;
}) {
  const galleryListQuery = useInfiniteQuery(galleryListQueryOptions({ authorId: user.id }));

  const supabase = useSupabase();
  const ref = useInfiniteScroll({
    loadMore: galleryListQuery.hasNextPage ? galleryListQuery.fetchNextPage : undefined,
    rootMargin: '100px',
  });

  function handleToggleImages(image: string) {
    return () => {
      onChange(
        selectedImages.includes(image)
          ? selectedImages.filter(i => i !== image)
          : selectedImages.concat(image).slice(Math.max(0, selectedImages.length + 1 - MAX_SELECTED_IMAGES)),
      );
    };
  }

  return (
    <>
      <Dialog.Body>
        <Flex flexWrap="wrap" gap={2}>
          {galleryListQuery.data?.map(image => (
            <Button
              w={28}
              h={28}
              variant="ghost"
              position="relative"
              key={image.url}
              type="button"
              onClick={handleToggleImages(image.url)}
            >
              {selectedImages.includes(image.url) && (
                <Box
                  bgColor="green.400/50"
                  position="absolute"
                  inset={0}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon as={FaCheck} size="2xl" color="green.900" />
                </Box>
              )}
              <Image
                src={supabase.storage.from('gallery').getPublicUrl(image.url).data.publicUrl}
                w={24}
                h={24}
                objectFit="contain"
              />
            </Button>
          ))}

          {(galleryListQuery.isPending || galleryListQuery.isFetchingNextPage) &&
            Array.from({ length: 20 }, (_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: fallback
              <Skeleton key={index} w={28} h={28} />
            ))}
        </Flex>
        {galleryListQuery.hasNextPage && <div ref={ref} style={{ border: '1px solid red' }} />}
      </Dialog.Body>
      <Dialog.Footer />
    </>
  );
}
