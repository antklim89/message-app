import type { ReactNode } from 'react';
import { Box, Card, Flex, HStack, Span, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import { EmbeddedSite } from '@/shared/ui/embedded-site';
import { EmbeddedYoutube } from '@/shared/ui/embedded-youtube';
import { FromNowDate } from '@/shared/ui/from-now-date';
import { RichText } from '@/shared/ui/rich-text';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { MessageImages } from './message-images';
import { MessageVideos } from './message-videos';
import type { MessageType } from '../models/types';

export function Message({ message, footer, menu }: { message: MessageType; footer?: ReactNode; menu: ReactNode }) {
  return (
    <Card.Root w="full">
      <Card.Header alignItems="center" asChild gap={2}>
        <HStack flexWrap="nowrap">
          <Span asChild>
            <Link to="/profile/$profileId" params={{ profileId: message.author.id }}>
              <UserAvatar username={message.author.username} src={message.author.avatar} />
            </Link>
          </Span>
          <Text
            fontSize="xl"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="100%"
            display="inline-block"
            boxSizing="border-box"
            lineHeight={0.9}
          >
            <Span>
              <Link to="/profile/$profileId" params={{ profileId: message.author.id }}>
                {message.author.username}
              </Link>
            </Span>
            <br />
            <Span fontSize="xs" fontWeight="normal">
              <FromNowDate date={message.created} />
            </Span>
          </Text>
          <Flex flexGrow={1} />

          <Box>{menu}</Box>
        </HStack>
      </Card.Header>

      {message.embeddedType === MessageEmbeddedType.IMAGES &&
        message.embeddedItems &&
        message.embeddedItems.length > 0 && <MessageImages images={message.embeddedItems} />}

      {message.embeddedType === MessageEmbeddedType.VIDEOS && <MessageVideos videos={message.embeddedItems} />}

      {message.embeddedType === MessageEmbeddedType.LINK && message.embeddedItems?.[0] && (
        <EmbeddedSite url={message.embeddedItems[0]} mx={1} w="auto" />
      )}
      {message.embeddedType === MessageEmbeddedType.YOUTUBE && message.embeddedItems?.[0] && (
        <EmbeddedYoutube videoId={message.embeddedItems[0]} mx={1} w="auto" />
      )}

      <Card.Body>
        <Box textWrap="wrap" w="fit-content" whiteSpace="pre-wrap">
          <RichText data={message.body} />
        </Box>
      </Card.Body>
      {footer}
    </Card.Root>
  );
}
