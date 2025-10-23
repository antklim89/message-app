import { type RefObject, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_CRITICAL, KEY_ENTER_COMMAND, type LexicalEditor } from 'lexical';

export function LexicalSubmitPlugin({
  ref,
  onEnterKeyDown,
}: {
  ref: RefObject<LexicalEditor | null>;
  onEnterKeyDown?: () => Promise<void>;
}) {
  const [editor] = useLexicalComposerContext();
  ref.current = editor;

  useEffect(() => {
    if (!onEnterKeyDown) return;

    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      e => {
        if (!e || e.key !== 'Enter' || !e.ctrlKey) return false;

        e.preventDefault();
        onEnterKeyDown();
        return true;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, onEnterKeyDown]);

  return null;
}
