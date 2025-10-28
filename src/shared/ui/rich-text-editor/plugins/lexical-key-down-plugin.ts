import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_CRITICAL, KEY_ENTER_COMMAND } from 'lexical';

export function LexicalKeyDownPlugin({ onKeyDown }: { onKeyDown?: (e: KeyboardEvent | null) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onKeyDown) return;

    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      e => {
        onKeyDown(e);
        return true;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, onKeyDown]);

  return null;
}
