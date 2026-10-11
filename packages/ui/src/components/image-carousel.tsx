import { useEffect } from 'react';
import { Box, Button, CloseButton, Dialog, Flex, Image, Portal, type UseDialogReturn } from '@chakra-ui/react';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export function ImageCarousel({
  images,
  onSelect,
  ...options
}: {
  images: string[];
  onSelect?: (selectedIndex: number) => void;
} & Partial<EmblaOptionsType>) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (!emblaApi) return;
    if (!onSelect) return;
    const listener = () => {
      const selectedIndex = emblaApi?.selectedScrollSnap();
      if (selectedIndex == null) return;
      onSelect(selectedIndex);
    };
    emblaApi.on('select', listener);
    return () => {
      emblaApi.off('select', listener);
    };
  }, [emblaApi, onSelect]);

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridTemplateRows="1fr">
      <Box ref={emblaRef} overflow="hidden" gridArea="1 / 1">
        <Flex>
          {images.map(image => (
            <Image
              flex="0 0 100%"
              minW={0}
              key={image}
              src={image}
              w="full"
              aspectRatio="landscape"
              objectFit="contain"
            />
          ))}
        </Flex>
      </Box>
      <Flex gridArea="1 / 1" justifyContent="space-between" alignItems="center" flexBasis="100%">
        <Button
          variant="ghost"
          h="120px"
          size="xs"
          onClick={e => {
            e.stopPropagation();
            emblaApi?.scrollPrev();
          }}
        >
          <FaChevronLeft />
        </Button>
        <Button
          variant="ghost"
          h="120px"
          size="xs"
          onClick={e => {
            e.stopPropagation();
            emblaApi?.scrollNext();
          }}
        >
          <FaChevronRight />
        </Button>
      </Flex>
    </Box>
  );
}

export function ImageCarouselDialog({
  dialog,
  images,
  onSelect,
  ...options
}: {
  dialog: UseDialogReturn;
  images: string[];
  onSelect?: (selectedIndex: number) => void;
} & Partial<EmblaOptionsType>) {
  return (
    <Dialog.RootProvider size="xl" value={dialog}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.CloseTrigger asChild zIndex={10}>
              <CloseButton size="xl" />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <ImageCarousel images={images} onSelect={onSelect} {...options} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}
