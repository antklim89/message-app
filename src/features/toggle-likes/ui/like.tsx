import { Icon, IconButton, Spinner } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { useToggleLikeMutation } from '../api/mutations/use-toggle-like-mutation';

interface Props {
  messageId: MessageType['id'];
  likesCount: number;
  hasLiked: boolean;
}

export function ToggleLikeButton({ messageId, hasLiked, likesCount }: Props) {
  const { mutateAsync, isPending } = useToggleLikeMutation({ hasLiked, messageId });

  function handleToggleLike() {
    mutateAsync();
  }

  return (
    <IconButton aria-label="like message" onClick={handleToggleLike} variant="ghost">
      {hasLiked ? <Icon as={FaHeart} fill="red.600" /> : <FaRegHeart />}
      {isPending ? <Spinner size="xs" /> : likesCount}
    </IconButton>
  );
}
