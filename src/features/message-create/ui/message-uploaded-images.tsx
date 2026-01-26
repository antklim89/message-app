import { FileUpload, Float, SimpleGrid, type UseFileUploadReturn } from '@chakra-ui/react';
import { FaX } from 'react-icons/fa6';

export function MessageUploadedImages({ upload }: { upload: UseFileUploadReturn }) {
  return (
    <FileUpload.RootProvider value={upload} mb={8}>
      <FileUpload.ItemGroup>
        <SimpleGrid columns={2} gap={2}>
          {upload.acceptedFiles.map(file => (
            <FileUpload.Item file={file} key={file.name} w="full" aspectRatio="wide" p={0}>
              <FileUpload.ItemPreviewImage w="full" h="full" objectFit="cover" />
              <Float offset="6" placement="top-end">
                <FileUpload.ItemDeleteTrigger boxSize="8" layerStyle="fill.solid" colorPalette="red">
                  <FaX />
                </FileUpload.ItemDeleteTrigger>
              </Float>
            </FileUpload.Item>
          ))}
        </SimpleGrid>
      </FileUpload.ItemGroup>
    </FileUpload.RootProvider>
  );
}
