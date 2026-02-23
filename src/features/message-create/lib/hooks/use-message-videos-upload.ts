import { useFileUpload } from '@chakra-ui/react';

import { fileUploadErrorMap } from '@/shared/lib/file-upload';
import { toaster } from '@/shared/lib/toaster';
import { MAX_UPLOADED_VIDEOS, MAX_VIDEO_SIZE_IN_BYTES } from '../../config/constants';

export function useMessageVideosUpload({ onUpload }: { onUpload: (files: File[]) => void }) {
  const fileUpload = useFileUpload({
    accept: ['video/mp4', 'video/x-matroska', 'video/webm'],
    maxFiles: MAX_UPLOADED_VIDEOS,
    maxFileSize: MAX_VIDEO_SIZE_IN_BYTES,

    onFileAccept({ files }) {
      console.log('🚀 ~ files: \n', files[0]?.size);
      onUpload(files);
    },
    onFileReject({ files }) {
      files.forEach(({ file, errors }) => {
        errors.forEach(error => {
          toaster.error({
            title: 'Video upload error.',
            description: fileUploadErrorMap(error, file, MAX_UPLOADED_VIDEOS),
            id: error,
          });
        });
      });
    },
  });
  return fileUpload;
}
