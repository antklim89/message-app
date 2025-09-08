import { Avatar, type AvatarFallbackProps, type AvatarRootProps } from '@chakra-ui/react';

import { useSupabasePublicUrl } from '../lib/supabase';

export function UserAvatar({
  src,
  username,
  size = 'xl',
  fontSize,
  ...props
}: {
  src?: string | null;
  username?: string;
  fontSize?: AvatarFallbackProps['fontSize'];
} & AvatarRootProps) {
  const isImage = src?.startsWith('http') || src?.startsWith('data:') || src?.startsWith('blob:');
  const avatarUrl = useSupabasePublicUrl(isImage ? undefined : src);

  return (
    <Avatar.Root size={size} {...props}>
      <Avatar.Image src={isImage ? (src ?? undefined) : avatarUrl} />
      <Avatar.Fallback fontSize={fontSize}>{username?.[0]}</Avatar.Fallback>
    </Avatar.Root>
  );
}
