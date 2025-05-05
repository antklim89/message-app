import { Card, Separator, Span } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { FromNowDate } from '@/components/ui/from-now-date';
import { Like } from '@/features/likes';
import type { MessageType } from '../types';

export function Message({ message }: { message: MessageType }) {
  return (
    <Card.Root w="full" border="none">
      <Card.Header>
        <Link to="/message/$messageId" params={{ messageId: message.id.toString() }}>
          <Card.Title>
            {message.title} {message.id}
          </Card.Title>
        </Link>
        <Span fontSize="xs">
          Published <FromNowDate date={message.created} /> by {message.author.username}
        </Span>
      </Card.Header>
      <Card.Body>
        <Card.Description>{message.body}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Like messageId={message.id} />
      </Card.Footer>
      <Separator />
    </Card.Root>
  );
}
