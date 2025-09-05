import type { FileRoutesById } from '@/shared/model/route-tree.generated';

export const tabs = [
  {
    to: '/profile',
    label: 'Profile',
  },
  {
    to: '/profile/settings',
    label: 'Settings',
  },
  {
    to: '/profile/favorite-messages',
    label: 'Favorites',
  },
] as const satisfies { label: string; to: keyof FileRoutesById }[];
