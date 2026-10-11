import { Box, FileUpload, Float, IconButton, Image, SimpleGrid, Spinner, Text, useFileUpload } from '@chakra-ui/react';
import { toaster } from '@message-app/ui/lib/toaster';
import { FaEraser, FaImage } from 'react-icons/fa6';

import { fileUploadErrorMap } from '@/shared/model/upload-error-map';
import { imagesUploadOptions } from '../../model/upload-options';

export function EmbedImages({ onFileAccept }: { onFileAccept: (files: File[]) => void }) {
  const upload = useFileUpload({
    ...imagesUploadOptions,
    onFileAccept({ files }) {
      onFileAccept(files);
    },
    onFileReject({ files }) {
      for (const { file, errors } of files) {
        for (const error of errors) {
          toaster.error({
            title: 'Images upload error.',
            description: fileUploadErrorMap(error, file, imagesUploadOptions.maxFiles),
            id: error,
          });
        }
      }
    },
  });

  return (
    <SimpleGrid columns={2} gap={2} w="full">
      {upload.acceptedFiles.map(file => (
        <Box key={file.name} w="full" aspectRatio="wide" p={0} position="relative">
          <Image src={URL.createObjectURL(file)} w="full" h="full" objectFit="cover" />
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
      ))}

      {Array.from({ length: 4 - upload.acceptedFiles.length }, (_, idx) => (
        <FileUpload.RootProvider key={idx} value={upload} cursor="pointer">
          <FileUpload.HiddenInput multiple />
          <FileUpload.Dropzone w="full" minHeight="auto" aspectRatio="wide">
            <FileUpload.DropzoneContent>
              <FileUpload.Trigger>{upload.transforming ? <Spinner /> : <FaImage />}</FileUpload.Trigger>
              <Text fontSize="lg">Upload Image</Text>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
        </FileUpload.RootProvider>
      ))}
    </SimpleGrid>
  );
}
