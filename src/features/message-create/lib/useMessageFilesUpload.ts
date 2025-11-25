import { useFileUpload } from '@chakra-ui/react';

import { optimizeImage } from '@/shared/lib/optimize-image';
import { toaster } from '@/shared/lib/toaster';
import { ACCEPT_FILES, MAX_FILES, MESSAGE_IMAGE_MAX_HEIGHT, MESSAGE_IMAGE_MAX_WIDTH } from '../config/constants';

export function useMessageFilesUpload({ onFileAccept }: { onFileAccept: (files: File[]) => void }) {
  return useFileUpload({
    accept: ACCEPT_FILES,
    maxFiles: MAX_FILES,
    onFileAccept(details) {
      onFileAccept(details.files);
    },
    onFileReject({ files }) {
      files.forEach(file => {
        file.errors.forEach(error => {
          if (error === 'TOO_MANY_FILES') {
            toaster.error({
              title: 'File upload error.',
              description: `Too many files. ${MAX_FILES} files are accepted.`,
              id: error,
            });
          }
          if (error === 'FILE_INVALID_TYPE') {
            toaster.error({
              title: 'File upload error.',
              description: 'Invalid file type.',
              id: error,
            });
          }
        });
      });
    },
    async transformFiles(files) {
      const result = await Promise.all(
        files.map(file =>
          optimizeImage({ file, maxWidth: MESSAGE_IMAGE_MAX_WIDTH, maxHeight: MESSAGE_IMAGE_MAX_HEIGHT }),
        ),
      );
      return result.filter(f => f != null);
    },
  });
}
