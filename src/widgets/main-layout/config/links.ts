import { FaCircleQuestion, FaHouse, FaUser } from 'react-icons/fa6';
import { type IconType } from 'react-icons/lib';

import { type FileRoutesById } from '@/shared/model/route-tree.generated';

interface Links {
  label: string;
  to: keyof FileRoutesById;
  isPublic: boolean;
  icon: IconType;
}

export const links = [
  {
    to: '/',
    label: 'Home',
    isPublic: true,
    icon: FaHouse,
  },
  {
    to: '/profile',
    label: 'Profile',
    isPublic: false,
    icon: FaUser,
  },
  {
    to: '/about',
    label: 'About',
    isPublic: true,
    icon: FaCircleQuestion,
  },
] as const satisfies Links[];
