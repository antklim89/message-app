import type { ReactNode } from 'react';
import { Avatar, Card, Flex, HStack, IconButton, Menu, Portal, Span, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaComment, FaEllipsis } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { FromNowDate } from '@/share/ui/from-now-date';
import { Protected } from '@/share/ui/protected';

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
    <Card.Root w="full" border="none">
      <Card.Header asChild alignItems="center" gap={4}>
        <HStack>
          <Avatar.Root>
            <Avatar.Image src={message.author.avatar || undefined} />
            <Avatar.Fallback />
          </Avatar.Root>
          <Card.Title display="flex" flexDirection="column">
            {message.title}
            <Span fontSize="xs" fontWeight="normal">
              Published <FromNowDate date={message.created} />{' '}
              <Protected privateElement={'by you'} publicElement={`by ${message.author.username}`} />
            </Span>
          </Card.Title>
          <Flex flexGrow={1} />

          <Menu.Root positioning={{ placement: 'bottom-end' }} unmountOnExit={false} lazyMount={false} size="md">
            <Menu.Trigger asChild>
              <IconButton variant="ghost" aria-label="message menu">
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
          <Text whiteSpace="pre" textWrap="wrap" w={'fit-content'}>
            {message.body}
          </Text>
        </Card.Body>
      </Card.Body>
      <Card.Footer display="flex" p={0} css={{ '& > *': { flex: '1 0 auto' } }}>
        {footer}
        <IconButton asChild variant="ghost" aria-label="answers for this message">
          <Link to="/answers/$answerId" params={{ answerId: message.id }}>
            <FaComment /> {message.answersCount}
          </Link>
        </IconButton>
      </Card.Footer>
    </Card.Root>
  );
}
