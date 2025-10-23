import type { ReactElement, ReactNode } from 'react';
import { Menu, type MenuRootProps, Span, Stack, type useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { UserAvatar } from '@/shared/ui/user-avatar';
import { getProfileListQueryOptions } from '../api/queries/use-profile-list-query';
import type { ProfileListItemType } from '../models/types';

export function ProfileSelect({
  onSelect,
  value = '',
  disclosure,
  input,
  trigger,
  ...props
}: {
  onSelect: (profile: ProfileListItemType) => void;
  value?: string;
  disclosure: ReturnType<typeof useDisclosure>;
  input?: ReactNode;
  trigger: ReactElement;
} & Omit<MenuRootProps, 'children' | 'onSelect'>) {
  const profileListQuery = useQuery(getProfileListQueryOptions({ search: value }));

  return (
    <Menu.Root onSelect={() => null} open={disclosure.open} onOpenChange={e => disclosure.setOpen(e.open)} {...props}>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {input}
          {profileListQuery.data?.map(profile => (
            <Menu.Item key={profile.id} value={profile.id} onClick={() => onSelect(profile)}>
              <UserAvatar w="2rem" h="2rem" fontSize="1rem" src={profile.avatar} username={profile.username} />
              <Menu.ItemText>
                <Span fontSize="md" fontWeight="bold">
                  {profile.displayname}
                </Span>
                <Span color="current/90">@{profile.username}</Span>
              </Menu.ItemText>
              <Stack gap={0}>
                {profile.isFollower && (
                  <Menu.ItemText opacity={0.7} fontSize="xs" as="span">
                    follower
                  </Menu.ItemText>
                )}
                {profile.isFollowing && (
                  <Menu.ItemText opacity={0.7} fontSize="xs" as="span">
                    following
                  </Menu.ItemText>
                )}
              </Stack>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
