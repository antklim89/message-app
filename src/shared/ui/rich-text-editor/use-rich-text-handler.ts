import { useCallback, useRef } from 'react';
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { calculateLexicalTextLength } from '@/shared/lib/lexical/utils';

export function useRichTextHandler({
  onSubmit,
  maxLength,
  minLength,
}: {
  onSubmit: (v?: SerializedRootNode) => Promise<void>;
  maxLength: number;
  minLength: number;
}) {
  const ref = useRef<LexicalEditor>(null);

  const handleSubmit = useCallback(async () => {
    const value = ref.current?.getEditorState().toJSON().root;
    const textLength = calculateLexicalTextLength(value);

    if (textLength <= maxLength || textLength >= minLength) {
      await onSubmit(value);
    }
  }, [onSubmit, maxLength, minLength]);

  return { ref, handleSubmit };
}
