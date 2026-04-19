import type { FileRoutesByTo } from '@/shared/model/route-tree.generated';

export const tabs = [
  {
    to: '/profile/$profileId',
    label: 'Profile',
  },
  {
    to: '/profile/$profileId/messages',
    label: 'Messages',
  },
  {
    to: '/profile/$profileId/images',
    label: 'Images',
  },
  {
    to: '/profile/$profileId/videos',
    label: 'Video',
  },
  {
    to: '/profile/$profileId/followers',
    label: 'Followers',
  },
  {
    to: '/profile/$profileId/followings',
    label: 'Followings',
  },
] as const satisfies { label: string; to: keyof FileRoutesByTo }[];
