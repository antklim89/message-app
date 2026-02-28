import { Box, type BoxProps, EmptyState } from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa6';
import { z } from 'zod/v4-mini';

import { checkYoutubeVideoId } from '../model/schema-checks';

const VideoIdSchema = z.string().check(checkYoutubeVideoId);

export function EmbeddedYoutube({ videoId, ...props }: { videoId: string } & BoxProps) {
  if (!VideoIdSchema.safeParse(videoId).success) return <EmbeddedYoutubeInvalid />;

  return (
    <Box asChild w="full" {...props}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </Box>
  );
}

export function EmbeddedYoutubeInvalid() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <FaYoutube />
        </EmptyState.Indicator>
        <EmptyState.Title>Invalid YouTube video URL</EmptyState.Title>
        <EmptyState.Description>Please enter a valid YouTube video URL.</EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
