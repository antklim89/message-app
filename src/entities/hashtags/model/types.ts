import type { hashtagsPeriods } from '../config/constants';

export interface HashtagItem {
  hashtag: string | null;
  count: number;
}

export type HashtagsPeriod = (typeof hashtagsPeriods)[number];
