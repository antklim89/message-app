import { useRef } from 'react';
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { calculateLexicalTextLength } from '@/shared/lib/lexical/utils';
import { MAX_MESSAGE_BODY_LENGTH, MIN_MESSAGE_BODY_LENGTH } from '../../config/constants';

export function useRichTextHandler({ onSubmit }: { onSubmit: (v?: SerializedRootNode) => Promise<void> }) {
  const ref = useRef<LexicalEditor>(null);

  async function handleSubmit() {
    const value = ref.current?.getEditorState().toJSON().root;

    const textLength = calculateLexicalTextLength(value);
    if (textLength <= MAX_MESSAGE_BODY_LENGTH || textLength >= MIN_MESSAGE_BODY_LENGTH) await onSubmit(value);
  }

  return { ref, handleSubmit };
}
