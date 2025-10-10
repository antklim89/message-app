import { Box, type BoxProps, Button, HStack, IconButton, Skeleton, Stack } from '@chakra-ui/react';

export const MessageEditFormFallback = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Skeleton w="full" h={100} />
      <Stack>
        <HStack mt={2}>
          {Array.from({ length: 2 }).map(() => (
            <Skeleton asChild key={Math.random()}>
              <IconButton />
            </Skeleton>
          ))}
        </HStack>
        <HStack mt={2}>
          {Array.from({ length: 5 }).map(() => (
            <Skeleton asChild key={Math.random()}>
              <IconButton />
            </Skeleton>
          ))}
        </HStack>
        <HStack justifyContent="flex-end">
          <Skeleton asChild>
            <Button>Cancel</Button>
          </Skeleton>
          <Skeleton asChild>
            <Button>Create</Button>
          </Skeleton>
        </HStack>
      </Stack>
    </Box>
  );
};
