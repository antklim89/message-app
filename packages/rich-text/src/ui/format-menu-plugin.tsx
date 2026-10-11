import { type ReactNode, useEffect, useState } from 'react';
import { Flex, IconButton, Separator } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, type TextFormatType } from 'lexical';
import { FaBold, FaEraser, FaItalic, FaStrikethrough, FaUnderline } from 'react-icons/fa6';

export function FormatMenu({ leftSlot, rightSlot }: { leftSlot?: ReactNode; rightSlot?: ReactNode }) {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  function handleClearFormats() {
    editor.update(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) return;
      if (selection.isCollapsed()) {
        selection.setFormat(0);
      } else {
        selection.formatText('bold', 0);
        selection.formatText('italic', 0);
        selection.formatText('strikethrough', 0);
        selection.formatText('underline', 0);
      }
    });
  }

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsStrikethrough(selection.hasFormat('strikethrough'));
        setIsUnderline(selection.hasFormat('underline'));
      });
    });
  }, [editor]);

  function handleFormat(format: TextFormatType) {
    return () => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    };
  }

  return (
    <Flex border="sm" borderBottom="none" borderColor="bg.muted" padding="1" borderTopRadius="sm" bg="bg.subtle">
      {leftSlot}
      {leftSlot ? <Separator orientation="vertical" w="2px" m="0 .425rem" /> : null}
      <IconButton size="sm" onClick={handleFormat('bold')} variant={isBold ? 'subtle' : 'ghost'}>
        <FaBold />
      </IconButton>
      <IconButton size="sm" onClick={handleFormat('italic')} variant={isItalic ? 'subtle' : 'ghost'}>
        <FaItalic />
      </IconButton>
      <IconButton size="sm" onClick={handleFormat('strikethrough')} variant={isStrikethrough ? 'subtle' : 'ghost'}>
        <FaStrikethrough />
      </IconButton>
      <IconButton size="sm" onClick={handleFormat('underline')} variant={isUnderline ? 'subtle' : 'ghost'}>
        <FaUnderline />
      </IconButton>
      <IconButton size="sm" onClick={handleClearFormats} variant="ghost">
        <FaEraser />
      </IconButton>
      {rightSlot ? <Separator orientation="vertical" w="2px" m="0 .425rem" /> : null}
      {rightSlot}
    </Flex>
  );
}
