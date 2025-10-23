import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { calculateLexicalTextLength } from '@/shared/lib/lexical';

export function LexicalBodyLengthPlugin({ maxLength }: { maxLength: number }) {
  const [editor] = useLexicalComposerContext();
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    return editor.registerUpdateListener(e => {
      const newLength = calculateLexicalTextLength(e.editorState.toJSON().root);
      setTextLength(newLength);
    });
  }, [editor]);

  return (
    <Text color={textLength > maxLength ? 'red.500' : undefined}>
      {textLength}/{maxLength}
    </Text>
  );
}
