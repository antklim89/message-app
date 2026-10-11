import { Button, Card, CardBody, type CardRootProps, Center, EmptyState, Image, Link, Spinner } from '@chakra-ui/react';
import { FaLinkSlash, FaUpRightFromSquare } from 'react-icons/fa6';

export function EmbeddedSite({
  metadata,
  ...props
}: {
  metadata: { favicon?: string; title?: string; description?: string; image?: string; url: string };
} & CardRootProps) {
  return (
    <Card.Root w="full" border="none" {...props}>
      <Card.Header borderBottom="xs" borderBottomColor="border" p={2}>
        <Card.Title display="flex" gap={4} alignItems="center">
          {metadata.favicon != null && <Image src={metadata.favicon} w="6" h="6" />}
          {metadata.title}
        </Card.Title>
        {metadata.description != null && <Card.Description>{metadata.description}</Card.Description>}
      </Card.Header>
      {metadata.image != null && (
        <Card.Body p={0}>
          <Image src={metadata.image} alt={metadata.title} width="full" height={320} objectFit="cover" />
        </Card.Body>
      )}
      <Card.Footer borderTop="xs" borderTopColor="border" p={2} mt="-1px">
        <Link target="_blank" color="LinkText" href={metadata.url}>
          {metadata.url} <FaUpRightFromSquare />
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

export function EmbeddedSiteError({
  refetch,
  isFetching,
  message,
}: {
  refetch?: () => void;
  isFetching?: boolean;
  message?: string;
}) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <FaLinkSlash />
        </EmptyState.Indicator>
        <EmptyState.Title>Failed to load site.</EmptyState.Title>
        <EmptyState.Description>
          {message ?? 'This site is not available or the URL is invalid. Please check the URL and try again.'}
        </EmptyState.Description>
        {refetch && (
          <Button loading={isFetching} loadingText="Retrying..." onClick={refetch}>
            Retry
          </Button>
        )}
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
