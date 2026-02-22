import { Button, Card, CardBody, type CardRootProps, Center, EmptyState, Image, Link, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaLinkSlash } from 'react-icons/fa6';
import { z } from 'zod/v4-mini';

import { useDebounceValue } from '@/shared/hooks/use-debounce-value';
import { createSupabaseClient } from '@/shared/lib/supabase';
import type { MetadataType } from '@/shared/model/metadata';

export function EmbeddedSite({ url, ...props }: { url: string } & CardRootProps) {
  const debouncedUrl = useDebounceValue(url, 700);

  const {
    data: metadata,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['embedded-site', debouncedUrl],
    async queryFn() {
      const { success, data: validatedUrl } = await z.string().check(z.httpUrl()).safeParseAsync(debouncedUrl);
      if (!success) throw new Error('Invalid url.');

      const supabase = await createSupabaseClient();
      const result = await supabase.functions.invoke<MetadataType>('get-site-metadata', {
        body: { url: validatedUrl },
      });
      if (error) throw new Error(result.error.message);
      return result.data;
    },
  });

  if (isLoading) return <EmbeddedSiteFallback url={url} />;
  if (!metadata) return <EmbeddedSiteError refetch={refetch} isFetching={isRefetching} />;

  return (
    <Card.Root w="full" {...props}>
      <Card.Header borderBottom="xs" borderBottomColor="border" p={2}>
        <Card.Title display="flex" gap={4} alignItems="center">
          {metadata.favicon != null && <Image src={metadata.favicon} w="6" h="6" />}
          {metadata.title}
        </Card.Title>
        {metadata.description != null && <Card.Description>{metadata.description}</Card.Description>}
      </Card.Header>
      {metadata.image != null && (
        <Card.Body>
          <Image src={metadata.image} alt={metadata.title} width="full" height={400} objectFit="cover" />
        </Card.Body>
      )}
      <Card.Footer borderTop="xs" borderTopColor="border" p={2} mt="-1px">
        <Link target="_blank" href={metadata.url}>
          {metadata.url}
        </Link>
      </Card.Footer>
    </Card.Root>
  );
}

export function EmbeddedSiteFallback({ url }: { url?: string }) {
  return (
    <Card.Root w="full">
      <Card.Header>
        <Card.Title display="flex" gap={4} alignItems="center">
          Loading...
        </Card.Title>
      </Card.Header>
      <CardBody asChild minH="220px">
        <Center>
          <Spinner />
        </Center>
      </CardBody>
      <Card.Footer>
        <Link target="_blank" href={url}>
          {url}
        </Link>
      </Card.Footer>
    </Card.Root>
  );
}

export function EmbeddedSiteError({ refetch, isFetching }: { refetch: () => void; isFetching: boolean }) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <FaLinkSlash />
        </EmptyState.Indicator>
        <EmptyState.Title>Failed to load site.</EmptyState.Title>
        <EmptyState.Description>
          This site is not available or the URL is invalid. Please check the URL and try again.
        </EmptyState.Description>
        <Button loading={isFetching} loadingText="Retrying..." onClick={refetch}>
          Retry
        </Button>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
