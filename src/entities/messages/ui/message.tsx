import type { ReactNode } from 'react';
import { Avatar, Card, Flex, HStack, IconButton, Menu, Portal, Span, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaComment, FaEllipsis } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { FromNowDate } from '@/share/ui/from-now-date';
// import { Protected } from '@/share/ui/protected';

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
          <Avatar.Root>
            <Avatar.Image src={message.author.avatar || undefined} />
            <Avatar.Fallback />
          </Avatar.Root>
          <Card.Title display="flex" flexDirection="column">
            {message.author.username}
            <Span fontSize="xs" fontWeight="normal">
              <FromNowDate date={message.created} />{' '}
              {/* <Protected privateElement="by you" publicElement={`by ${message.author.username}`} /> */}
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
          <Text textWrap="wrap" w="fit-content" whiteSpace="pre">
            {message.body}
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
