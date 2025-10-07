import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import type { SerializedLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { SerializedLexicalNode, SerializedParagraphNode, SerializedRootNode, SerializedTextNode } from 'lexical';

import type { SerializedUserNode } from '@/shared/lib/lexical/nodes/user-node';

export function MessageBodyLengthPlugin({
  onLengthChange,
  maxLength,
}: {
  onLengthChange: (length: number) => void;
  maxLength: number;
}) {
  const [editor] = useLexicalComposerContext();
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    return editor.registerUpdateListener(e => {
      const newLength = calculateLexicalTextLength(e.editorState.toJSON().root);
      setTextLength(newLength);
      onLengthChange(newLength);
    });
  }, [editor, onLengthChange]);

  return (
    <Text color={textLength > maxLength ? 'red.500' : undefined}>
      {textLength}/{maxLength}
    </Text>
  );
}

function calculateLexicalTextLength(data: SerializedLexicalNode): number {
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
