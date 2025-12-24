import { useFileUpload } from '@chakra-ui/react';

import { toaster } from '@/shared/lib/toaster';

export function useGalleryImageUpload({ onUpload }: { onUpload: (files: File[]) => Promise<void> }) {
  return useFileUpload({
    accept: 'image/*',
    maxFiles: 20,
    async onFileAccept({ files }) {
      if (files.length === 0) return toaster.error({ description: 'No files to upload' });
      await onUpload(files);
    },
  });
}
