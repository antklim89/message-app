import { type ReactNode, useState } from 'react';
import { useDialog } from '@chakra-ui/react';

import { GalleryContent, type GalleryImage } from '@/entities/gallery';
import { useSupabase } from '@/shared/lib/supabase';
import { ImageCarouselDialog } from '@/shared/ui/image-carousel';

export function UserGalleryContent({
  images,
  uploadButton,
  ...props
}: {
  images: GalleryImage[];
  uploadButton?: ReactNode;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const supabase = useSupabase();
  const dialog = useDialog();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function handleImageClick(image: string) {
    dialog.setOpen(true);
    setSelectedImage(image);
  }

  const imagesUrls = images.map(i => supabase.storage.from('gallery').getPublicUrl(i.url).data.publicUrl);
  const startIndex = selectedImage ? imagesUrls.indexOf(selectedImage) : undefined;
  function handleCarouselImageSelect(index: number): void {
    const img = imagesUrls[index];
    const q = document.querySelector(`[data-id="${img}"]`);
    q?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'center' });
  }

  return (
    <>
      <GalleryContent {...props} onImageClick={handleImageClick} images={images} />

      <ImageCarouselDialog
        dialog={dialog}
        images={imagesUrls}
        startIndex={startIndex}
        onSelect={handleCarouselImageSelect}
      />
    </>
  );
}
