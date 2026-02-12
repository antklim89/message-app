import { Suspense, useEffect } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { INSERT_EMOJI, registerEmojiCommands } from '@/shared/lib/lexical/nodes/emoji-node';
import { EmojiPicker } from '@/shared/ui/emoji-picker';

export function LexicalEmojiPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerEmojiCommands(editor);
  }, [editor]);

  return (
    <Suspense
      fallback={
        <Center>
          <Spinner />
        </Center>
      }
    >
      <EmojiPicker
        onEmojiSelect={emoji => {
          editor.dispatchCommand(INSERT_EMOJI, emoji);
        }}
      />
    </Suspense>
  );
}
