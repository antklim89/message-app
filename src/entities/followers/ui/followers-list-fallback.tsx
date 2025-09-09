import { Fragment } from 'react';
import { Card, HStack, Separator, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';

const FOLLOWERS_LENGTH = 7;
export function FollowersListFallback() {
  return (
    <Card.Root>
      <Card.Body asChild>
        <Stack>
          {Array.from({ length: FOLLOWERS_LENGTH }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: it is just a fallback
            <Fragment key={index}>
              <HStack>
                <SkeletonCircle w={12} h={12} />
                <Stack w="full">
                  <Skeleton h={6} w="40%" />
                  <Skeleton h={6} w="20%" />
                </Stack>
              </HStack>
              {index !== FOLLOWERS_LENGTH - 1 && <Separator />}
            </Fragment>
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
