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
      <Card.Header>
        <Link to="/message/$messageId" params={{ messageId: message.id }}>
          <Card.Title display="flex" alignItems="center" gap={4}>
            <Avatar.Root>
              <Avatar.Image src={message.author.avatar} />
              <Avatar.Fallback />
            </Avatar.Root>
            {message.title}
          </Card.Title>
        </Link>
        <Span fontSize="xs">
          Published <FromNowDate date={message.created} /> by {author}
        </Span>
      </Card.Header>
      <Card.Body>
        <Card.Description>{message.body}</Card.Description>
      </Card.Body>
      <Card.Footer display="flex" pb={2} css={{ '& > *': { flex: '1 0 auto' } }}>
        {footer}
        <IconButton asChild variant="ghost" aria-label="answers for this message">
          <Link to="/message/$messageId" params={{ messageId: message.id }}>
            <FaComment />
          </Link>
        </IconButton>
      </Card.Footer>
      <Separator />
    </Card.Root>
  );
}
