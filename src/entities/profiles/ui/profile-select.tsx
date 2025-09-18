import { useState } from 'react';
import { Button, Input, Menu, Span, Stack, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaUserPlus } from 'react-icons/fa6';

import { UserAvatar } from '@/shared/ui/user-avatar';
import { getProfileListQueryOptions } from '../api/queries/use-profile-list-query';
import { type ProfileListItemType } from '../models/types';

export function ProfileSelect({ onSelect }: { onSelect: (profile: ProfileListItemType) => void }) {
  const disclosure = useDisclosure();
  const [usernameTerm, setUsernameTerm] = useState('');
  const profileListQuery = useQuery({
    ...getProfileListQueryOptions({ search: usernameTerm }),
    enabled: usernameTerm.length > 1,
  });

  return (
    <Menu.Root
      positioning={{ placement: 'bottom', strategy: 'fixed' }}
      open={disclosure.open}
      onOpenChange={e => disclosure.setOpen(e.open)}
    >
      <Menu.Trigger asChild>
        <Button width="fit-content" size="sm">
          <FaUserPlus />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content minW={320}>
          <Input value={usernameTerm} onChange={e => setUsernameTerm(e.target.value)} />

          {profileListQuery.data?.map(profile => (
            <Menu.Item key={profile.id} value={profile.id} onClick={() => onSelect(profile)}>
              <UserAvatar src={profile.avatar} username={profile.username} />
              <Menu.ItemText>
                <Span fontSize="md" fontWeight="bold">
                  {profile.displayname}
                </Span>
                <Span color="current/90">@{profile.username}</Span>
              </Menu.ItemText>
              <Stack>
                {profile.isFollower && <Menu.ItemText>follower</Menu.ItemText>}
                {profile.isFollowing && <Menu.ItemText>following</Menu.ItemText>}
              </Stack>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
