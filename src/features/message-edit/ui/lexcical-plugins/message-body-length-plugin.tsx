import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { MAX_MESSAGE_BODY_LENGTH } from '@/shared/lib/lexical/constants';
import { calculateLexicalTextLength } from '@/shared/lib/lexical/utils';

export function MessageBodyLengthPlugin() {
  const [editor] = useLexicalComposerContext();
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    return editor.registerUpdateListener(e => {
      const newLength = calculateLexicalTextLength(e.editorState.toJSON().root);
      setTextLength(newLength);
    });
  }, [editor]);

  return (
    <Text color={textLength > MAX_MESSAGE_BODY_LENGTH ? 'red.500' : undefined}>
      {textLength}/{MAX_MESSAGE_BODY_LENGTH}
    </Text>
  );
}
