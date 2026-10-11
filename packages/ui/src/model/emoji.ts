export interface Emoji {
  group: number;
  hexcode: string;
  label: string;
  unicode: string;
  skins?: Omit<Emoji, 'skins'>[];
  tags?: string[];
}
