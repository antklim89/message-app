import { type ReactNode, startTransition, useState } from 'react';
import { Button, Card, useDialog } from '@chakra-ui/react';
import { FaTrash, FaX } from 'react-icons/fa6';

import { GalleryContent, type GalleryImage } from '@/entities/gallery';
import { GalleryDeleteButton } from '@/features/gallery-edit';
import { useSupabase } from '@/shared/lib/supabase';
import { ImageCarouselDialog } from '@/shared/ui/image-carousel';

export function UserGalleryContent({
  images,
  uploadButton,
  authorId,
  ...props
}: {
  images: GalleryImage[];
  authorId: string;
  uploadButton?: ReactNode;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const supabase = useSupabase();
  const dialog = useDialog();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImages, setSelectedImages] = useState<GalleryImage[]>([]);

  const imagesUrls = images.map(i => supabase.storage.from('gallery').getPublicUrl(i.url).data.publicUrl);
  const startIndex = selectedImage
    ? imagesUrls.indexOf(supabase.storage.from('gallery').getPublicUrl(selectedImage.url).data.publicUrl)
    : undefined;

  function handleImageClick(image: GalleryImage) {
    dialog.setOpen(true);
    setSelectedImage(image);
  }

  function handleImageSelect(imageUrls: GalleryImage[]) {
    startTransition(() => {
      setSelectedImages(prevImageUrls =>
        imageUrls.every(imageUrl => prevImageUrls.includes(imageUrl))
          ? prevImageUrls.filter(i => !imageUrls.includes(i))
          : [...imageUrls, ...prevImageUrls],
      );
    });
  }

  function handleCarouselImageSelect(index: number): void {
    const img = images[index];
    if (!img) return;
    document
      .querySelector(`[data-id="${img.url}"]`)
      ?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'center' });
  }

  return (
    <>
      {selectedImages.length > 0 && (
        <Card.Root
          p={2}
          flexDirection="row"
          position="fixed"
          zIndex="modal"
          bottom="24"
          right="50%"
          transform="translateX(50%)"
        >
          <Button onClick={() => setSelectedImages([])} variant="ghost" aria-label="Unselect all images">
            <FaX />
          </Button>
          <GalleryDeleteButton
            authorId={authorId}
            images={selectedImages}
            aria-label="Delete selected images"
            colorPalette="red"
            onSuccess={() => setSelectedImages([])}
          >
            <FaTrash />
          </GalleryDeleteButton>
        </Card.Root>
      )}
      <GalleryContent
        {...props}
        onImageClick={handleImageClick}
        images={images}
        selectedImages={selectedImages}
        onImageSelect={handleImageSelect}
      />
      <ImageCarouselDialog
        dialog={dialog}
        images={imagesUrls}
        startIndex={startIndex}
        onSelect={handleCarouselImageSelect}
      />
    </>
  );
}
