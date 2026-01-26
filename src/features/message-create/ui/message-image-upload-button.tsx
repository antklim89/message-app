import { FileUpload, IconButton, type UseFileUploadReturn } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa6';

export function MessageImageUploadButton({ upload }: { upload: UseFileUploadReturn }) {
  return (
    <FileUpload.RootProvider value={upload}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <IconButton>
          <FaUpload />
        </IconButton>
      </FileUpload.Trigger>
    </FileUpload.RootProvider>
  );
}
