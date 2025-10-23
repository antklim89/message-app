import { useEffect, useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { FaBold, FaEraser, FaItalic, FaStrikethrough, FaUnderline } from 'react-icons/fa6';

export function LexicalFormatButtonsPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  function handleClearFormats() {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      selection.formatText('bold', 0);
      selection.formatText('italic', 0);
      selection.formatText('strikethrough', 0);
      selection.formatText('underline', 0);
    });
  }

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;
        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsStrikethrough(selection.hasFormat('strikethrough'));
        setIsUnderline(selection.hasFormat('underline'));
      });
    });
  }, [editor]);

  return (
    <>
      <IconButton
        variant={isBold ? 'solid' : 'outline'}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
      >
        <FaBold />
      </IconButton>
      <IconButton
        variant={isItalic ? 'solid' : 'outline'}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
      >
        <FaItalic />
      </IconButton>
      <IconButton
        variant={isStrikethrough ? 'solid' : 'outline'}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
      >
        <FaStrikethrough />
      </IconButton>
      <IconButton
        variant={isUnderline ? 'solid' : 'outline'}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
      >
        <FaUnderline />
      </IconButton>
      <IconButton
        variant={[isBold, isItalic, isStrikethrough, isUnderline].some(Boolean) ? 'solid' : 'outline'}
        onClick={handleClearFormats}
      >
        <FaEraser />
      </IconButton>
    </>
  );
}
