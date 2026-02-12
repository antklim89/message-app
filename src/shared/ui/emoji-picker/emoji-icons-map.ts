import {
  FaBicycle,
  FaBook,
  FaCat,
  FaEarthAfrica,
  FaFaceSmile,
  FaFlag,
  FaFont,
  FaHotdog,
  FaPerson,
  FaSquare,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons/lib';
import { LuOmega } from 'react-icons/lu';

export const emojiIconsMap = {
  'smileys emotion': FaFaceSmile,
  'people body': FaPerson,
  component: FaSquare,
  'animals nature': FaCat,
  'food drink': FaHotdog,
  'travel places': FaEarthAfrica,
  activities: FaBicycle,
  objects: FaBook,
  symbols: LuOmega,
  flags: FaFlag,
  words: FaFont,
} as Record<string, IconType>;
