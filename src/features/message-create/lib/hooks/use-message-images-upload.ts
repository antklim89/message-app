import { useFileUpload } from '@chakra-ui/react';

import { fileUploadErrorMap, resizeImage } from '@/shared/lib/file-upload';
import { toaster } from '@/shared/lib/toaster';
import { MAX_UPLOADED_IMAGES } from '../../config/constants';

export function useMessageImagesUpload({ onUpload }: { onUpload: (files: File[]) => void }) {
  const fileUpload = useFileUpload({
    accept: 'image/*',
    maxFiles: MAX_UPLOADED_IMAGES,
    onFileAccept({ files }) {
      onUpload(files);
    },
    validate(file, { acceptedFiles }) {
      const set = new Set([file.name + file.lastModified]);
      for (const acceptedFile of acceptedFiles) {
        if (set.has(acceptedFile.name + acceptedFile.lastModified)) return ['FILE_EXISTS'];
        set.add(acceptedFile.name + acceptedFile.lastModified);
      }
      return null;
    },
    async transformFiles(files) {
      const transformedFiles = await Promise.all(
        files.map(file => resizeImage({ file, maxWidth: 1280, maxHeight: 1024 })),
      );
      return transformedFiles.filter(file => file != null);
    },
    onFileReject({ files }) {
      files.forEach(({ file, errors }) => {
        errors.forEach(error => {
          toaster.error({
            title: 'Image upload error.',
            description: fileUploadErrorMap(error, file, MAX_UPLOADED_IMAGES),
            id: error,
          });
        });
      });
    },
  });
  return fileUpload;
}
