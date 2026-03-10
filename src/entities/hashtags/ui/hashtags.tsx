import { useState } from 'react';
import { Card, SegmentGroup, Tabs } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { HashtagsList } from '@/entities/hashtags';
import { HashtagsFallback } from './hashtags-fallback';
import { getHashtagsQueryOptions } from '../api/queries/use-hashtags-query';
import { hashtagsPeriods } from '../config/constants';
import type { HashtagsPeriod } from '../model/types';

export function Hashtags() {
  const [period, setPeriod] = useState<HashtagsPeriod>(hashtagsPeriods[0]);
  const { data: hashtags, isPending } = useQuery(getHashtagsQueryOptions({ period }));

  return (
    <Card.Root>
      <Tabs.Root value={period} onValueChange={e => setPeriod(e.value as HashtagsPeriod)}>
        <Card.Header justifyContent="space-between" flexDirection="row" alignItems="baseline">
          <Card.Title>Popular hashtags</Card.Title>
          <SegmentGroup.Root
            size="xs"
            w="fit-content"
            value={period}
            onValueChange={e => setPeriod(e.value as HashtagsPeriod)}
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={hashtagsPeriods as unknown as string[]} />
          </SegmentGroup.Root>
        </Card.Header>
        <Card.Body>
          {isPending || hashtags == null ? <HashtagsFallback /> : <HashtagsList hashtags={hashtags} />}
        </Card.Body>
      </Tabs.Root>
    </Card.Root>
  );
}
