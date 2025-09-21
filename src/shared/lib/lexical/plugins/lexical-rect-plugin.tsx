import { useEffect, useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  type LexicalEditor,
  type RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';

export const RECT_CHANGE_COMMAND = createCommand<DOMRect | null>();

export function LexicalRectPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;

        const cursorRect = getCursorRect();
        const elementRect = getElementRect(selection, editor);
        const rect = cursorRect && cursorRect.x === 0 ? elementRect : cursorRect;

        if (!rect) return false;
        rect.width = 0;
        editor.dispatchCommand(RECT_CHANGE_COMMAND, rect ?? null);

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}

export function useLexicalRectPlugin(editor: LexicalEditor) {
  const position = useRef<DOMRect | null>(null);
  useEffect(() => {
    return editor.registerCommand(
      RECT_CHANGE_COMMAND,
      rect => {
        position.current = rect;
        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);
  return position;
}

function getCursorRect() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount <= 0) return null;
  return selection.getRangeAt(0).cloneRange().getBoundingClientRect();
}

function getElementRect(selection: RangeSelection, editor: LexicalEditor) {
  const nodeKey = selection.getNodes().at(-1)?.getKey();

  if (!nodeKey) return null;
  const element = editor.getElementByKey(nodeKey);
  return element?.getBoundingClientRect() || null;
}
