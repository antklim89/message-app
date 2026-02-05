import { useFileUpload } from '@chakra-ui/react';

import { fileUploadErrorMap, resizeVideo } from '@/shared/lib/file-upload';
import { toaster } from '@/shared/lib/toaster';
import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import { MAX_UPLOADED_VIDEOS, VIDEO_FPS } from '../../config/constants';

export function useMessageVideosUpload({
  onUpload,
}: {
  onUpload: (args: { files: File[]; type: Extract<MessageEmbeddedType, 'videos'> }) => void;
}) {
  const fileUpload = useFileUpload({
    accept: ['video/mp4'],
    maxFiles: MAX_UPLOADED_VIDEOS,
    onFileAccept({ files }) {
      onUpload({ files, type: MessageEmbeddedType.VIDEOS });
    },
    async transformFiles(files) {
      const transformedFiles = await Promise.all(
        files.map(file => resizeVideo({ file, maxWidth: 640, maxHeight: 480, fps: VIDEO_FPS })),
      );
      return transformedFiles.filter(file => file != null);
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
