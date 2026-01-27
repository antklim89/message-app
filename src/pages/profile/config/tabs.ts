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
] as const satisfies { label: string; to: keyof FileRoutesByTo }[];
