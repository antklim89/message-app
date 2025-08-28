import type { ReactNode } from 'react';
import { Avatar, Card, Flex, HStack, IconButton, Menu, Portal, Span, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaCircleCheck, FaComment, FaEllipsis } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { useSupabasePublicUrl } from '@/shared/lib/supabase';
import { FromNowDate } from '@/shared/ui/from-now-date';
import { Protected } from '@/shared/ui/protected';
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
  const avatarUrl = useSupabasePublicUrl(message.author.avatar);

  return (
    <Card.Root border="none" w="full">
      <Card.Header alignItems="center" asChild gap={4}>
        <HStack>
          <Avatar.Root>
            <Avatar.Image src={avatarUrl} />
            <Avatar.Fallback />
          </Avatar.Root>
          <Card.Title display="flex" flexDirection="column">
            <Span alignItems="baseline" display="flex" fontSize="xl" gap={4}>
              {message.author.username}
              <Protected
                checkIsPublic={user => user?.id !== message.authorId}
                privateElement={<FaCircleCheck size={12} title="This is your message." />}
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
              <Span color="blue.200" key={key}>
                {word}
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
