import { useFileUpload } from '@chakra-ui/react';
import { ACCEPT_VIDEOS, MAX_VIDEO_SIZE_IN_BYTES } from '@message-app/entities/messages';
import { toaster } from '@message-app/ui/lib/toaster';
import { useMutation } from '@tanstack/react-query';

import { trpc } from '@/shared/lib/trpc';
import { fileUploadErrorMap } from '@/shared/model/upload-error-map';
import { useMessageCreateContext } from './use-message-create-context';

export function useVideoUpload() {
  const context = useMessageCreateContext();
  const { mutateAsync } = useMutation(trpc.messages.uploadVideo.mutationOptions());

  const upload = useFileUpload({
    maxFileSize: MAX_VIDEO_SIZE_IN_BYTES,
    accept: ACCEPT_VIDEOS,
    maxFiles: 1,
    async transformFiles(files) {
      context.startTransition(async () => {
        for await (const file of files) {
          toaster.loading({ description: `The video ${file.name} is uploading...`, id: file.name });
          await new Promise(resolve => setTimeout(resolve, 2000));
          try {
            const result = await mutateAsync(file);
            context.setEmbedState(prev => ({
              ...prev,
              videos: { type: 'videos', videoSrc: result || null },
            }));
            toaster.success({ description: `The video ${file.name} is uploaded successfully.`, id: file.name });
          } catch {
            toaster.error({ description: `Failed to upload the file ${file.name}`, id: file.name });
          }
        }
      });

      return files;
    },
    onFileReject({ files }) {
      for (const { file, errors } of files) {
        for (const error of errors) {
          toaster.error({
            title: 'The video upload error.',
            description: fileUploadErrorMap(error, file, 1),
            id: error,
          });
        }
      }
    },
  });

  return upload;
}
