import { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, IconButton, Image, SimpleGrid, useDialog, VisuallyHidden } from '@chakra-ui/react';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import { useSupabase } from '@/shared/lib/supabase';
import { Dialog } from '@/shared/ui/dialog';

export function MessageImages({ images }: { images: string[] }) {
  const dialog = useDialog({});
  const supabase = useSupabase();
  const selectedImageIndexRef = useRef(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: selectedImageIndexRef.current });

  return (
    <>
      <SimpleGrid gridTemplateColumns="1fr 1fr" gap={1} overflow="hidden" m={1} borderRadius="xl">
        {images.map((imageUrl, index) => (
          <Button
            gridColumn={images.length % 2 === 1 && index === images.length - 1 ? 'auto / span 2' : undefined}
            key={imageUrl}
            cursor="pointer"
            unstyled
            onClick={() => {
              dialog.setOpen(true);
              selectedImageIndexRef.current = index;
            }}
          >
            <Image
              src={supabase.storage.from('gallery').getPublicUrl(imageUrl).data.publicUrl}
              w="full"
              aspectRatio="wide"
              alt="Message image"
            />
          </Button>
        ))}
      </SimpleGrid>
      <Dialog.Root scrollBehavior="inside" size="xl" dialog={dialog}>
        <Dialog.Body p={0}>
          <Box display="grid" gridTemplateColumns="1fr" gridTemplateRows="1fr">
            <Box ref={emblaRef} overflow="hidden" gridArea="1 / 1">
              <Flex>
                {images.map(imageUrl => (
                  <Image
                    flex="0 0 100%"
                    minW={0}
                    key={imageUrl}
                    src={supabase.storage.from('gallery').getPublicUrl(imageUrl).data.publicUrl}
                    w="full"
                    aspectRatio="landscape"
                    objectFit="contain"
                  />
                ))}
              </Flex>
            </Box>

            {images.length > 1 && (
              <Flex gridArea="1 / 1" flexDirection="column">
                <Flex justifyContent="space-between" alignItems="center" flexBasis="100%">
                  <Button variant="ghost" h="120px" size="xs" onClick={() => emblaApi?.scrollPrev()}>
                    <FaChevronLeft />
                  </Button>
                  <Button variant="ghost" h="120px" size="xs" onClick={() => emblaApi?.scrollNext()}>
                    <FaChevronRight />
                  </Button>
                </Flex>
                <MessageImagesDots emblaApi={emblaApi} />
              </Flex>
            )}
          </Box>
        </Dialog.Body>
      </Dialog.Root>
    </>
  );
}

function MessageImagesDots({ emblaApi }: { emblaApi?: EmblaCarouselType }) {
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
          zIndex={1}
          unstyled
          w={3}
          h={3}
          borderRadius="full"
          border="sm"
          borderColor="colorPalette.600"
          bgColor={selectedImageIndex === index ? 'colorPalette.600' : 'transparent'}
          key={i}
          onClick={() => emblaApi.scrollTo(index)}
        >
          <VisuallyHidden>Scroll to image {index}</VisuallyHidden>
        </IconButton>
      ))}
    </Flex>
  );
}
