import { Suspense, useEffect } from 'react';
import { IconButton, useDialog } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FaFaceSmile } from 'react-icons/fa6';

import { INSERT_EMOJI, registerEmojiCommands } from '@/shared/lib/lexical/nodes/emoji-node';
import { EmojiPicker } from '@/shared/ui/emoji-picker';

export function MessageEmojiPlugin() {
  const [editor] = useLexicalComposerContext();
  const dialog = useDialog();

  useEffect(() => {
    return registerEmojiCommands(editor);
  }, [editor]);

  return (
    <>
      <IconButton onClick={() => dialog.setOpen(true)}>
        <FaFaceSmile />
      </IconButton>

      <Suspense>
        <EmojiPicker
          onEmojiSelect={emoji => {
            editor.dispatchCommand(INSERT_EMOJI, emoji);
            setTimeout(() => dialog.setOpen(false), 10);
          }}
          value={dialog}
          scrollBehavior="inside"
          motionPreset="slide-in-bottom"
          onExitComplete={() => {
            editor.focus();
          }}
          placement="top"
          size="xl"
        />
      </Suspense>
    </>
  );
}
