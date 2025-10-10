import type { SerializedLinkNode } from '@lexical/link';
import type { SerializedLexicalNode, SerializedParagraphNode, SerializedRootNode, SerializedTextNode } from 'lexical';

import type { SerializedUserNode } from './nodes/user-node';

export function calculateLexicalTextLength(data?: SerializedLexicalNode): number {
  if (!data) return 0;

  switch (data.type) {
    case 'root':
    case 'paragraph':
    case 'link': {
      const { children } = data as SerializedRootNode | SerializedParagraphNode | SerializedLinkNode;
      return children.reduce((acc, i) => acc + calculateLexicalTextLength(i), 0);
    }

    case 'text':
    case 'hashtag':
    case 'user': {
      const { text } = data as SerializedTextNode | SerializedUserNode;
      return text.length;
    }

    default:
      return 0;
  }
}
