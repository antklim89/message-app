import { Link as ChakraLink, Flex } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import type { HashtagItem } from '../model/types';

export function HashtagsList({ hashtags }: { hashtags: HashtagItem[] }) {
  return (
    <Flex flexWrap="wrap" gap={2}>
      {hashtags.map(
        ({ hashtag }) =>
          hashtag != null && (
            <ChakraLink asChild key={hashtag}>
              <Link to="/hashtag/$hashtag" params={{ hashtag }}>
                {hashtag}
              </Link>
            </ChakraLink>
          ),
      )}
    </Flex>
  );
}
