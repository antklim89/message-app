import { useState } from 'react';
import { Field, Input } from '@chakra-ui/react';
import { EmbeddedSite, EmbeddedSiteError, EmbeddedSiteFallback } from '@message-app/ui/components/embedded-site';
import { useDebounceValue } from '@message-app/ui/hooks/use-debounce-value';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4-mini';

import { trpc } from '@/shared/lib/trpc';

export function EmbedSite({ onChange }: { onChange: (value: string) => void }) {
  const [value, setValue] = useState('');

  const valueDebounced = useDebounceValue(value, 700);
  const isValidUrl = z.string().check(z.httpUrl()).safeParse(valueDebounced).success;

  const {
    data: siteMetadata,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(
    trpc.siteMetadata.getSiteMetadata.queryOptions({ url: valueDebounced }, { enabled: isValidUrl, retry: 0 }),
  );

  return (
    <Field.Root py={2}>
      <Field.Label textAlign="center" w="full" px="4" py="1">
        Site URL
      </Field.Label>
      <Input
        placeholder="https://example.com"
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      {isFetching && <EmbeddedSiteFallback />}
      {siteMetadata && <EmbeddedSite metadata={siteMetadata} />}
      {isError && <EmbeddedSiteError isFetching={isFetching} message={error?.message} refetch={refetch} />}
    </Field.Root>
  );
}
