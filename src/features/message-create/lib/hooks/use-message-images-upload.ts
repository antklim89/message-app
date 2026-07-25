import { useFileUpload } from '@chakra-ui/react';

import { fileUploadErrorMap, resizeImage } from '@/shared/lib/file-upload';
import { toaster } from '@/shared/lib/toaster';
import { MAX_IMAGE_SIZE_IN_BYTES, MAX_UPLOADED_IMAGES } from '../../config/constants';

export function useMessageImagesUpload({ onUpload }: { onUpload: (files: File[]) => void }) {
  const fileUpload = useFileUpload({
    accept: 'image/*',
    maxFiles: MAX_UPLOADED_IMAGES,
    onFileAccept({ files }) {
      onUpload(files);
    },
    async transformFiles(files) {
      const transformedFiles = await Promise.all(
        files.map(async file => {
          const { success, error, result } = await resizeImage({
            maxImageSize: MAX_IMAGE_SIZE_IN_BYTES,
            file,
            maxWidth: 1280,
            maxHeight: 1024,
          });
          if (success) return result;
          toaster.error({ description: error.message });
        }),
      );
      return transformedFiles.filter(file => file != null);
    },
    onFileReject({ files }) {
      for (const { file, errors } of files) {
        for (const error of errors) {
          toaster.error({
            title: 'Image upload error.',
            description: fileUploadErrorMap(error, file, MAX_UPLOADED_IMAGES),
            id: error,
          });
        }
      }
    },
  });
  return fileUpload;
}
