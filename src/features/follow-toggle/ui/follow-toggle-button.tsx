import { Button, type ButtonProps } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';

import { useFollowToggleMutation } from '../mutations/use-follow-toggle-mutation';

export function FollowToggleButton({
  followerId,
  isFollowing,
  ...props
}: { followerId: string; isFollowing: boolean } & ButtonProps) {
  const followToggleMutation = useFollowToggleMutation({ followerId, isFollowing });

  return (
    <Button
      {...props}
      size="xs"
      variant={isFollowing ? 'outline' : 'solid'}
      loading={followToggleMutation.isPending}
      loadingText={isFollowing ? 'Stopping follow ...' : 'Starting follow...'}
      onClick={() => followToggleMutation.mutateAsync()}
    >
      {isFollowing ? <FaCheck /> : null}
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
