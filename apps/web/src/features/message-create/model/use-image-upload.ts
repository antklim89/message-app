import { useFileUpload } from '@chakra-ui/react';
import { ACCEPT_IMAGES, MAX_UPLOADED_IMAGES } from '@message-app/entities/messages';
import { toaster } from '@message-app/ui/lib/toaster';
import { useMutation } from '@tanstack/react-query';

import { trpc } from '@/shared/lib/trpc';
import { fileUploadErrorMap } from '@/shared/model/upload-error-map';
import { useMessageCreateContext } from './use-message-create-context';

export function useImageUpload() {
  const context = useMessageCreateContext();
  const { mutateAsync } = useMutation(trpc.messages.uploadTempFile.mutationOptions());

  const upload = useFileUpload({
    accept: ACCEPT_IMAGES,
    maxFiles: MAX_UPLOADED_IMAGES,
    async transformFiles(files) {
      context.startTransition(async () => {
        for await (const file of files) {
          toaster.loading({ description: `The image ${file.name} is uploading...`, id: file.name });
          await new Promise(resolve => setTimeout(resolve, 2000));
          try {
            const result = await mutateAsync(file);
            context.setEmbedState(prev => ({
              ...prev,
              images: { type: 'images', imagesSrc: [...(prev.images?.imagesSrc || []), result] },
            }));
            toaster.success({ description: `The image ${file.name} is uploaded successfully.`, id: file.name });
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
            title: 'The image upload error.',
            description: fileUploadErrorMap(error, file, MAX_UPLOADED_IMAGES),
            id: error,
          });
        }
      }
    },
  });

  return upload;
}
