import { Avatar } from '@chakra-ui/react';

import { useSupabasePublicUrl } from '../lib/supabase';

export function UserAvatar({ src, size = 4, username }: { src?: string | null; size?: number; username?: string }) {
  const isImage = src?.startsWith('http') || src?.startsWith('data:') || src?.startsWith('blob:');
  const avatarUrl = useSupabasePublicUrl(isImage ? undefined : src);

  return (
    <Avatar.Root w={`${size}rem`} height={`${size}rem`}>
      <Avatar.Image src={isImage ? (src ?? undefined) : avatarUrl} />
      <Avatar.Fallback fontSize={`${size / 2}rem`}>{username?.[0]}</Avatar.Fallback>
    </Avatar.Root>
  );
}
