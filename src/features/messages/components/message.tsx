import { Card, Separator, Span } from '@chakra-ui/react';

import type { MessageType } from '../types';

export function Message({ message }: { message: MessageType }) {
  return (
    <Card.Root w="full" border="none">
      <Card.Header>
        <Card.Title>{message.title}</Card.Title>
        <Span>{message.created}</Span>
      </Card.Header>
      <Card.Body>
        <Card.Description>{message.body}</Card.Description>
      </Card.Body>
      <Separator />
    </Card.Root>
  );
}
