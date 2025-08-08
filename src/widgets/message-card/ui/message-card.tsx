import { FavoriteButton } from '@/entities/favorites';
import { Like } from '@/entities/likes';
import { Message, type MessageType } from '@/entities/messages';

export function MessageCard({ message }: { message: MessageType }) {
  return (
    <Message
      message={message}
      footer={
        <>
          <Like messageId={message.id} hasLiked={message.hasLiked} likesCount={message.likesCount} />
          <FavoriteButton isFavorite={message.isFavorite} messageId={message.id} />
        </>
      }
    />
  );
}
