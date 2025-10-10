import { useRef } from 'react';
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { MAX_MESSAGE_BODY_LENGTH } from './constants';
import { calculateLexicalTextLength } from './utils';

export function useRichTextHandler({ onSubmit }: { onSubmit: (v?: SerializedRootNode) => Promise<void> }) {
  const ref = useRef<LexicalEditor>(null);

  async function handleSubmit() {
    const value = ref.current?.getEditorState().toJSON().root;

    const textLength = calculateLexicalTextLength(value);
    if (textLength <= MAX_MESSAGE_BODY_LENGTH) await onSubmit(value);
  }

  return { ref, handleSubmit };
}
