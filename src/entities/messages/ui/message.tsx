import type { ReactNode } from 'react';
import { Box, Card, Flex, HStack, IconButton, Image, Span } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaCircleCheck, FaComment } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { useSupabasePublicUrl } from '@/shared/lib/supabase';
import { FromNowDate } from '@/shared/ui/from-now-date';
import { Protected } from '@/shared/ui/protected';
import { RichText } from '@/shared/ui/rich-text';
import { UserAvatar } from '@/shared/ui/user-avatar';

export function Message({ message, footer, menu }: { message: MessageType; footer?: ReactNode; menu: ReactNode }) {
  const mediaUrl = useSupabasePublicUrl('message_media', message.media);

  return (
    <Card.Root w="full">
      <Card.Header alignItems="center" asChild gap={4}>
        <HStack>
          <Link to="/profile/$profileId" params={{ profileId: message.author.id }}>
            <UserAvatar username={message.author.username} src={message.author.avatar} />
          </Link>
          <Card.Title display="flex" flexDirection="column">
            <Span alignItems="baseline" display="flex" fontSize="xl" gap={4} asChild>
              <Link to="/profile/$profileId" params={{ profileId: message.author.id }}>
                {message.author.username}
                <Protected
                  privateElement={<FaCircleCheck size={12} title="This is your message." />}
                  authorId={message.authorId}
                />
              </Link>
            </Span>
            <Span fontSize="xs" fontWeight="normal">
              <FromNowDate date={message.created} />
            </Span>
          </Card.Title>
          <Flex flexGrow={1} />

          {menu}
        </HStack>
      </Card.Header>
      {mediaUrl && <Image src={mediaUrl} w="full" aspectRatio="wide" />}
      <Card.Body>
        <Card.Body>
          <Box textWrap="wrap" w="fit-content" whiteSpace="pre-wrap">
            <RichText data={message.body} />
          </Box>
        </Card.Body>
      </Card.Body>
      <Card.Footer css={{ '& > *': { flex: '1 0 auto' } }} display="flex" p={0}>
        {footer}
        <IconButton aria-label="answers for this message" asChild variant="ghost">
          <Link params={{ answerId: message.id }} to="/answers/$answerId">
            <FaComment /> {message.answersCount}
          </Link>
        </IconButton>
      </Card.Footer>
    </Card.Root>
  );
}
