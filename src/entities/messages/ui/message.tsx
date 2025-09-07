import type { ReactNode } from 'react';
import { Card, Flex, HStack, IconButton, Menu, Portal, Span, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaCircleCheck, FaComment, FaEllipsis } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { FromNowDate } from '@/shared/ui/from-now-date';
import { Protected } from '@/shared/ui/protected';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { wrapMessageHashTags } from '../lib/utils';

export function Message({
  message,
  footer,
  menuItems,
}: {
  message: MessageType;
  footer?: ReactNode;
  menuItems: ReactNode;
}) {
  return (
    <Card.Root border="none" w="full">
      <Card.Header alignItems="center" asChild gap={4}>
        <HStack>
          <UserAvatar username={message.author.username} src={message.author.avatar} />
          <Card.Title display="flex" flexDirection="column">
            <Span alignItems="baseline" display="flex" fontSize="xl" gap={4}>
              {message.author.username}
              <Protected
                privateElement={<FaCircleCheck size={12} title="This is your message." />}
                authorId={message.authorId}
              />
            </Span>
            <Span fontSize="xs" fontWeight="normal">
              <FromNowDate date={message.created} />
            </Span>
          </Card.Title>
          <Flex flexGrow={1} />

          <Menu.Root lazyMount={false} positioning={{ placement: 'bottom-end' }} size="md" unmountOnExit={false}>
            <Menu.Trigger asChild>
              <IconButton aria-label="message menu" variant="ghost">
                <FaEllipsis />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>{menuItems}</Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Card.Body>
          <Text textWrap="wrap" w="fit-content" whiteSpace="pre-wrap">
            {wrapMessageHashTags(message.body, (word, key) => (
              <Span color="blue.200" key={key} asChild>
                <Link to="/hashtag/$hashtag" params={{ hashtag: word }}>
                  {word}
                </Link>
              </Span>
            ))}
          </Text>
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
