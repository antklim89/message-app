import { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, IconButton, Image, SimpleGrid, useDialog, VisuallyHidden } from '@chakra-ui/react';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import { useSupabase } from '@/shared/lib/supabase';
import { Dialog } from '@/shared/ui/dialog';
import type { MessageType } from '../models/types';

export function MessageGallery({ media, messageId }: { messageId: MessageType['id']; media: MessageType['media'] }) {
  const dialog = useDialog({});
  const supabase = useSupabase();
  const selectedImageIndexRef = useRef(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: selectedImageIndexRef.current });
  const mediaUrls = media?.map(
    mediaItem => supabase.storage.from('message_media').getPublicUrl(`${messageId}/${mediaItem}`).data.publicUrl,
  );

  if (!mediaUrls || mediaUrls.length === 0) return null;
  return (
    <>
      <SimpleGrid gridTemplateColumns="1fr 1fr" gap={1} overflow="hidden" m={1} borderRadius="xl">
        {mediaUrls.map((mediaUrl, index) => (
          <Button
            gridColumn={mediaUrls.length % 2 === 1 && index === mediaUrls.length - 1 ? 'auto / span 2' : undefined}
            key={mediaUrl}
            cursor="pointer"
            unstyled
            onClick={() => {
              dialog.setOpen(true);
              selectedImageIndexRef.current = index;
            }}
          >
            <Image src={mediaUrl} w="full" maxH="200px" />
          </Button>
        ))}
      </SimpleGrid>
      <Dialog.Root size="xl" dialog={dialog}>
        <Dialog.Body p={0}>
          <Box display="grid" gridTemplateColumns="1fr" gridTemplateRows="1fr">
            <Box ref={emblaRef} overflow="hidden" gridArea="1 / 1">
              <Flex>
                {mediaUrls.map(mediaUrl => (
                  <Image
                    flex="0 0 100%"
                    minW={0}
                    key={mediaUrl}
                    src={mediaUrl}
                    w="full"
                    aspectRatio="landscape"
                    objectFit="contain"
                  />
                ))}
              </Flex>
            </Box>
            <Flex gridArea="1 / 1" flexDirection="column">
              <Flex justifyContent="space-between" alignItems="center" flexBasis="100%">
                <Button h="120px" size="xs" onClick={() => emblaApi?.scrollPrev()}>
                  <FaChevronLeft />
                </Button>
                <Button h="120px" size="xs" onClick={() => emblaApi?.scrollNext()}>
                  <FaChevronRight />
                </Button>
              </Flex>
              <MessageGalleryDots emblaApi={emblaApi} />
            </Flex>
          </Box>
        </Dialog.Body>
      </Dialog.Root>
    </>
  );
}

function MessageGalleryDots({ emblaApi }: { emblaApi?: EmblaCarouselType }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;

    const listener = (e: EmblaCarouselType) => {
      setSelectedImageIndex(e.selectedScrollSnap());
    };

    emblaApi.on('select', listener).on('init', listener).on('reInit', listener);
    return () => {
      emblaApi.off('select', listener).off('init', listener).off('reInit', listener);
    };
  }, [emblaApi]);
  return (
    <Flex gap={1} justifyContent="center">
      {emblaApi?.scrollSnapList().map((i, index) => (
        <IconButton
          size="xs"
          borderRadius="lg"
          variant={selectedImageIndex === index ? 'subtle' : 'outline'}
          key={i}
          onClick={() => emblaApi.scrollTo(index)}
        >
          <VisuallyHidden>Scroll to image {index}</VisuallyHidden>
        </IconButton>
      ))}
    </Flex>
  );
}
