import { Card, IconButton } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FaComment } from 'react-icons/fa6';

import { Message, type MessageType } from '@/entities/messages';
import { ToggleFavoriteButton } from '@/features/toggle-favorites';
import { ToggleLikeButton } from '@/features/toggle-likes';
import { MessageCardMenu } from './message-card-menu';

export function MessageCard({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  return (
    <Message
      footer={
        <Card.Footer css={{ '& > *': { flex: '1 0 auto' } }} display="flex" p={0}>
          <ToggleLikeButton hasLiked={message.hasLiked} likesCount={message.likesCount} messageId={message.id} />

          <ToggleFavoriteButton isFavorite={message.isFavorite} messageId={message.id} />

          <IconButton aria-label="answers for this message" asChild variant="ghost">
            <Link params={{ answerId: message.id }} to="/answers/$answerId">
              <FaComment /> {message.answersCount}
            </Link>
          </IconButton>
        </Card.Footer>
      }
      menu={<MessageCardMenu deleteRedirectUrl={deleteRedirectUrl} message={message} />}
      message={message}
    />
  );
}
