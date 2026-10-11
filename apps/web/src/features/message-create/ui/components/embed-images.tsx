import { Box, FileUpload, Float, IconButton, Image, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { FaEraser, FaImage } from 'react-icons/fa6';

import { useImageUpload } from '../../model/use-image-upload';

export function EmbedImages() {
  const upload = useImageUpload();

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
