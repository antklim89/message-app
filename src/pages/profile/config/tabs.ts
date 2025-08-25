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
] as const satisfies { label: string; to: keyof FileRoutesById }[];
