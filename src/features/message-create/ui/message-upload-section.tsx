import type { ReactNode } from 'react';
import {
  Box,
  FileUpload,
  Float,
  IconButton,
  SimpleGrid,
  Spinner,
  Text,
  type UseFileUploadReturn,
} from '@chakra-ui/react';
import { FaEraser, FaFile } from 'react-icons/fa6';

export function MessageUploadSection({
  upload,
  maxUploadedFiles,
  fileIcon = <FaFile />,
  uploadMessage,
  render,
}: {
  upload: UseFileUploadReturn;
  maxUploadedFiles: number;
  fileIcon?: ReactNode;
  uploadMessage: string;
  render: (file: File) => ReactNode;
}) {
  return (
    <SimpleGrid columns={maxUploadedFiles <= 1 ? 1 : 2} gap={2} w="full">
      {upload.acceptedFiles.map(file => (
        <Box key={file.name} w="full" aspectRatio="wide" p={0} position="relative">
          {render(file)}
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

      {Array.from({ length: maxUploadedFiles - upload.acceptedFiles.length }, (_, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: ok
        <FileUpload.RootProvider key={idx} value={upload}>
          <FileUpload.HiddenInput multiple />
          <FileUpload.Dropzone w="full" minHeight="auto" aspectRatio="wide">
            <FileUpload.DropzoneContent>
              <FileUpload.Trigger>{upload.transforming ? <Spinner /> : fileIcon}</FileUpload.Trigger>
              <Text>{uploadMessage}</Text>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
        </FileUpload.RootProvider>
      ))}
    </SimpleGrid>
  );
}
