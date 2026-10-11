import type { SerializedLinkNode } from '@lexical/link';
import type { SerializedLexicalNode, SerializedTextNode } from 'lexical';

import type { SerializedUserNode } from '../model/nodes/user-node';
import { IS_BOLD, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE, RICH_TEXT_EDITOR_NAMESPACE } from '../model/constants';

export function copyRichText({
  node,
  text,
}: {
  node: SerializedLexicalNode | SerializedTextNode | SerializedUserNode | SerializedLinkNode;
  text: string;
}) {
  return new Promise<DataTransfer | null>((resolve, reject) => {
    const copyListener = (e: ClipboardEvent) => {
      e.preventDefault();

      e.clipboardData?.setData(
        'application/x-lexical-editor',
        JSON.stringify({
          namespace: RICH_TEXT_EDITOR_NAMESPACE,
          nodes: [node],
        }),
      );
      e.clipboardData?.setData('text/plain', text);
      resolve(e.clipboardData);
    };

    document.addEventListener('copy', copyListener);

    const dummy = document.createElement('textarea');
    dummy.style.position = 'fixed';
    dummy.style.opacity = '0';
    dummy.value = ' ';
    document.body.appendChild(dummy);
    dummy.select();

    try {
      const success = document.execCommand('copy');
      if (!success) reject(new Error('Copy failed:'));
    } catch (cause) {
      reject(new Error('Copy failed:', { cause }));
    } finally {
      document.body.removeChild(dummy);
      document.removeEventListener('copy', copyListener);
    }
  });
}
export function getFormatStyles(format: number) {
  const isBold = (format & IS_BOLD) === IS_BOLD;
  const isItalic = (format & IS_ITALIC) === IS_ITALIC;
  const isStrikethrough = (format & IS_STRIKETHROUGH) === IS_STRIKETHROUGH;
  const isUnderline = (format & IS_UNDERLINE) === IS_UNDERLINE;

  return {
    fontStyle: isItalic ? 'italic' : undefined,
    fontWeight: isBold ? 'bold' : undefined,
    textDecoration: `${isStrikethrough ? 'line-through' : ''} ${isUnderline ? 'underline' : ''}`.trim(),
  };
}
