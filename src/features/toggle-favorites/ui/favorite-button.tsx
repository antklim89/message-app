import { Icon, IconButton, Spinner } from '@chakra-ui/react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { useToggleFavoriteMutation } from '../api/mutations/use-toggle-favorite-mutation';

interface Props {
  messageId: MessageType['id'];
  isFavorite: boolean;
}

export function ToggleFavoriteButton({ messageId, isFavorite }: Props) {
  const toggleLikeMutation = useToggleFavoriteMutation({ isFavorite, messageId });

  function handleToggleLike() {
    toggleLikeMutation.mutateAsync();
  }

  return (
    <IconButton aria-label="like message" onClick={handleToggleLike} variant="ghost">
      {isFavorite ? <Icon as={FaBookmark} fill="yellow.600" /> : <FaRegBookmark />}
      {toggleLikeMutation.isPending ? <Spinner size="xs" /> : null}
    </IconButton>
  );
}
