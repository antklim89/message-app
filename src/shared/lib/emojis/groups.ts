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
import { LuOmega } from 'react-icons/lu';

export const emojiGroups = {
  0: { label: 'smileys-emotion', icon: FaFaceSmile },
  1: { label: 'people-body', icon: FaPerson },
  2: { label: 'component', icon: FaSquare },
  3: { label: 'animals-nature', icon: FaCat },
  4: { label: 'food-drink', icon: FaHotdog },
  5: { label: 'travel-places', icon: FaEarthAfrica },
  6: { label: 'activities', icon: FaBicycle },
  7: { label: 'objects', icon: FaBook },
  8: { label: 'symbols', icon: LuOmega },
  9: { label: 'flags', icon: FaFlag },
  10: { label: 'words', icon: FaFont },
} as const;
