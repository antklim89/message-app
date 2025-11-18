import { Button, Skeleton, Stack } from '@chakra-ui/react';

import { Dialog } from '@/shared/ui/dialog';

export const ReportCreateFormFallback = () => {
  return (
    <>
      <Dialog.Title>Create Report</Dialog.Title>
      <Dialog.Body>
        <Stack>
          {Array.from({ length: 6 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: this is fallback
            <Skeleton w="full" h="54px" key={index} />
          ))}
          <Skeleton w="full" h="38px" />
        </Stack>
      </Dialog.Body>
      <Dialog.Footer>
        <Skeleton asChild>
          <Button>Create</Button>
        </Skeleton>
      </Dialog.Footer>
    </>
  );
};
