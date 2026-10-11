import type { EditorThemeClasses } from 'lexical';

export const RICH_TEXT_EDITOR_NAMESPACE = '@message-app/rich-text-editor';
export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;

export const theme: EditorThemeClasses = {
  hashtag: 'editor-hashtag',
  link: 'editor-link',
  user: 'editor-user',
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    strikethrough: 'editor-text-strikethrough',
    underline: 'editor-text-underline',
    underlineStrikethrough: 'editor-text-underline-strikethrough',
  },
};
