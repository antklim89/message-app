import { Box, Image, SimpleGrid } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteScroll } from '@/shared/hooks/use-infinity-scroll';
import { useSupabase } from '@/shared/lib/supabase';
import { galleryListQueryOptions } from './api/queries/use-gallery-list-query';

export function Gallery() {
  const supabase = useSupabase();
  const query = useSuspenseInfiniteQuery(galleryListQueryOptions());

  const ref = useInfiniteScroll({
    loadMore: query.hasNextPage ? query.fetchNextPage : undefined,
    rootMargin: '100px',
  });

  return (
    <Box>
      <SimpleGrid columns={4} gap={1}>
        {query.data.map(result =>
          result.urls.map(url => (
            <div key={url}>
              <Image
                width={200}
                height={200}
                src={supabase.storage.from('gallery').getPublicUrl(url).data.publicUrl}
                alt="gallery"
              />
            </div>
          )),
        )}
      </SimpleGrid>

      {query.isFetchingNextPage && <div>Loading more images...</div>}
      {query.hasNextPage && <div ref={ref} />}
    </Box>
  );
}
