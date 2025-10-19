import { Box, type BoxProps, HStack, IconButton, Skeleton, Stack } from '@chakra-ui/react';

export const MessageEditFormFallback = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Skeleton w="full" h={100} />
      <Stack>
        <HStack mt={2}>
          {Array.from({ length: 3 }).map(() => (
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
      </Stack>
    </Box>
  );
};
