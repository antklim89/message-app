import type { UseFileUploadProps } from '@chakra-ui/react';
import {
  ACCEPT_IMAGES,
  ACCEPT_VIDEOS,
  MAX_UPLOADED_IMAGES,
  MAX_UPLOADED_VIDEOS,
  MAX_VIDEO_SIZE_IN_BYTES,
} from '@message-app/entities/messages';

export const imagesUploadOptions: UseFileUploadProps = {
  accept: ACCEPT_IMAGES,
  maxFiles: MAX_UPLOADED_IMAGES,
};

export const videoUploadOptions: UseFileUploadProps = {
  accept: ACCEPT_VIDEOS,
  maxFiles: MAX_UPLOADED_VIDEOS,
  maxFileSize: MAX_VIDEO_SIZE_IN_BYTES,
};
