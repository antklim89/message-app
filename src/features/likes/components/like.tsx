import { IconButton, Spinner } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import { useFetchOneMessage } from '@/features/messages';
import { useToggleLikes } from '../hooks/mutation/use-toggle-likes';

interface Props {
  messageId: string;
}

export function Like({ messageId }: Props) {
  const { data } = useFetchOneMessage({ id: messageId });

  const { mutateAsync, isPending } = useToggleLikes({ hasLiked: data.likes.hasLiked, messageId });

  return (
    <IconButton aria-label="like message" variant="ghost" onClick={() => mutateAsync()}>
      {data.likes.hasLiked ? <FaHeart /> : <FaRegHeart />}
      {isPending ? <Spinner size="xs" /> : data.likes.count}
    </IconButton>
  );
}
