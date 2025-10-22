import type { emojiGroups } from '../ui/emoji-picker/emoji-groups';

export interface Emoji {
  group: EmojiGroupKey;
  hexcode: string;
  label: string;
  unicode: string;
  skins?: Omit<Emoji, 'skins'>[];
  tags?: string[];
}

export type EmojiGroup = typeof emojiGroups;
export type EmojiGroupKey = keyof EmojiGroup;
export type EmojiGroupLabels = EmojiGroup[EmojiGroupKey]['label'];
