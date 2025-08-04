import type { ReactNode } from 'react';
import { Avatar, Card, IconButton, Separator, Span } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaComment } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { useSession } from '@/share/hooks/use-session';
import { FromNowDate } from '@/share/ui/from-now-date';

export function Message({ message, footer }: { message: MessageType; footer?: ReactNode }) {
  const { data: user } = useSession();
  const author = user?.id === message.author.id ? 'you' : message.author.username;

  return (
    <Card.Root w="full" border="none">
      <Card.Header asChild display="flex" flexDirection="row" alignItems="center" gap={4}>
        <Link to="/answers/$answerId" params={{ answerId: message.id }}>
          <Avatar.Root>
            <Avatar.Image src={message.author.avatar || undefined} />
            <Avatar.Fallback />
          </Avatar.Root>
          <Card.Title display="flex" flexDirection="column">
            {message.title}
            <Span fontSize="xs" fontWeight="normal">
              Published <FromNowDate date={message.created} /> by {author}
            </Span>
          </Card.Title>
        </Link>
      </Card.Header>
      <Card.Body>
        <Card.Description>{message.body}</Card.Description>
      </Card.Body>
      <Card.Footer display="flex" p={0} css={{ '& > *': { flex: '1 0 auto' } }}>
        {footer}
        <IconButton asChild variant="ghost" aria-label="answers for this message">
          <Link to="/answers/$answerId" params={{ answerId: message.id }}>
            <FaComment />
          </Link>
        </IconButton>
      </Card.Footer>
      <Separator />
    </Card.Root>
  );
}
