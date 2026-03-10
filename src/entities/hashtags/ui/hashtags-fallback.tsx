import { Flex, Skeleton } from '@chakra-ui/react';

export function HashtagsFallback() {
  return (
    <Flex flexWrap="wrap" gap={2}>
      {Array.from({ length: 20 }, (_, idx) => (
        <Skeleton
          // biome-ignore lint/suspicious/noArrayIndexKey: ok
          key={idx}
          w="12"
          css={{
            '&:nth-child(1n)': { w: '12' },
            '&:nth-child(2n)': { w: '22' },
            '&:nth-child(3n)': { w: '18' },
            '&:nth-child(4n)': { w: '8' },
            '&:nth-child(5n)': { w: '26' },
          }}
          h="1rem"
        />
      ))}
    </Flex>
  );
}
