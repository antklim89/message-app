import { Box, FileUpload, Float, IconButton, Spinner, Text, useFileUpload } from '@chakra-ui/react';
import { toaster } from '@message-app/ui/lib/toaster';
import { FaEraser, FaVideo } from 'react-icons/fa6';

import { fileUploadErrorMap } from '@/shared/model/upload-error-map';
import { videoUploadOptions } from '../../model/upload-options';

export function EmbedVideo({ onFileAccept }: { onFileAccept: (file: File) => void }) {
  const upload = useFileUpload({
    ...videoUploadOptions,
    onFileAccept({ files }) {
      const [file] = files;
      if (file) onFileAccept(file);
    },
    onFileReject({ files }) {
      for (const { file, errors } of files) {
        for (const error of errors) {
          toaster.error({
            title: 'Video upload error.',
            description: fileUploadErrorMap(error, file, videoUploadOptions.maxFiles),
            id: error,
          });
        }
      }
    },
  });

  const [file] = upload.acceptedFiles;

  return (
    <Box w="full">
      {file ? (
        <Box key={file.name} w="full" aspectRatio="wide" p={0} position="relative">
          <video width="100%" src={URL.createObjectURL(file)} controls />
          <Float offset="6" placement="top-end">
            <IconButton
              onClick={() => upload.deleteFile(file, 'accepted')}
              boxSize="8"
              layerStyle="fill.solid"
              colorPalette="red"
            >
              <FaEraser />
            </IconButton>
          </Float>
        </Box>
      ) : (
        <FileUpload.RootProvider value={upload} cursor="pointer">
          <FileUpload.HiddenInput multiple />
          <FileUpload.Dropzone w="full" minHeight="auto" aspectRatio="wide">
            <FileUpload.DropzoneContent>
              <FileUpload.Trigger>{upload.transforming ? <Spinner /> : <FaVideo />}</FileUpload.Trigger>
              <Text fontSize="lg">Upload Video</Text>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
        </FileUpload.RootProvider>
      )}
    </Box>
  );
}
