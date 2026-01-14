import { useFileUpload } from '@chakra-ui/react';

import { fileUploadErrorMap, optimizeImage } from '@/shared/lib/image-upload';
import { toaster } from '@/shared/lib/toaster';

const MAX_FILES_UPLOAD = 20;

export function useGalleryImageUpload({ onUpload }: { onUpload: (files: File[]) => Promise<void> }) {
  const fileUpload = useFileUpload({
    accept: 'image/*',
    maxFiles: MAX_FILES_UPLOAD,
    async onFileAccept({ files }) {
      if (files.length === 0) return;
      await onUpload(files);
      fileUpload.clearFiles();
    },
    async transformFiles(files) {
      const transformedFiles = await Promise.all(
        files.map(file => optimizeImage({ file, maxWidth: 1280, maxHeight: 1024 })),
      );
      return transformedFiles.filter(file => file != null);
    },
    onFileChange() {
      fileUpload.clearFiles();
    },
    onFileReject({ files }) {
      files.forEach(({ file, errors }) => {
        errors.forEach(error => {
          toaster.error({
            title: 'Image upload error.',
            description: fileUploadErrorMap(error, file, 20),
            id: error,
          });
        });
      });
    },
  });
  return fileUpload;
}
