import { Icon, IconButton, Spinner } from '@chakra-ui/react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { useToggleLikeMutation } from '../api/hooks/use-toggle-like-mutation';

interface Props {
  messageId: MessageType['id'];
  isFavorite: boolean;
}

export function FavoriteButton({ messageId, isFavorite }: Props) {
  const { mutateAsync, isPending } = useToggleLikeMutation({ isFavorite, messageId });

  function handleTogleLike() {
    mutateAsync();
  }

  return (
    <IconButton aria-label="like message" onClick={handleTogleLike} variant="ghost">
      {isFavorite ? <Icon as={FaBookmark} fill="yellow.600" /> : <FaRegBookmark />}
      {isPending ? <Spinner size="xs" /> : null}
    </IconButton>
  );
}
