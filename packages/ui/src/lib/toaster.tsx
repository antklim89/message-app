import { createToaster } from '@chakra-ui/react';

export const toaster = createToaster({
  duration: 8 * 1000,
  pauseOnPageIdle: true,
  placement: 'top-end',
});
