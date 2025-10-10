import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';

import { $isUserNode, UserNode } from '@/shared/lib/lexical';
import { getWordFromText } from '@/shared/lib/utils';

export const SELECT_WORD = createCommand<string>();

export function LexicalSelectWordPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([UserNode])) {
      throw new Error('UserLexicalPlugin: UserNode not registered on editor (initialConfig.nodes)');
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;
        const selectedNode = selection.getNodes()[0];

        if ($isUserNode(selectedNode) && selection.isCollapsed()) {
          const word = selectedNode.getUsername();
          editor.dispatchCommand(SELECT_WORD, word);
          return false;
        }

        if ($isTextNode(selectedNode) && selection.isCollapsed()) {
          const focusOffset = selection.focus.offset;
          const textContent = selectedNode.getTextContent();
          const word = getWordFromText(textContent, focusOffset);

          editor.dispatchCommand(SELECT_WORD, word);
          return false;
        }

        if (!selection.isCollapsed()) {
          const textContent = selection.getTextContent().trim();
          editor.dispatchCommand(SELECT_WORD, textContent);
          return false;
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
