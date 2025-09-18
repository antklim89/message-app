import { FavoriteButton } from '@/entities/favorites';
import { Like } from '@/entities/likes';
import { Message, type MessageType } from '@/entities/messages';
import { MessageCardMenu } from './message-card-menu';

export function MessageCard({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  return (
    <Message
      footer={
        <>
          <Like hasLiked={message.hasLiked} likesCount={message.likesCount} messageId={message.id} />
          <FavoriteButton isFavorite={message.isFavorite} messageId={message.id} />
        </>
      }
      menu={<MessageCardMenu deleteRedirectUrl={deleteRedirectUrl} message={message} />}
      message={message}
    />
  );
}
