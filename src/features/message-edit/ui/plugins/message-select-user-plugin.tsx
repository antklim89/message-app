import { useEffect, useState } from 'react';
import { IconButton, Input, useDisclosure } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_EDITOR, KEY_DOWN_COMMAND } from 'lexical';
import { FaUserPlus } from 'react-icons/fa6';

import { ProfileSelect } from '@/entities/profiles';
import { INSERT_USER, SELECT_WORD, useLexicalRectPlugin } from '@/shared/lib/lexical';

export function MessageSelectUserPlugin() {
  const [editor] = useLexicalComposerContext();
  const [usernameTerm, setUsernameTerm] = useState('');
  const position = useLexicalRectPlugin(editor);
  const disclosure = useDisclosure();

  useEffect(() => {
    return editor.registerCommand(
      SELECT_WORD,
      word => {
        setUsernameTerm(word);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      e => {
        if (e.key === '@') {
          e.preventDefault();
          disclosure.onOpen();
        }
        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor, disclosure]);

  return (
    <ProfileSelect
      positioning={{
        placement: 'bottom-start',
        strategy: 'fixed',
        getAnchorRect: () => position.current,
      }}
      onExitComplete={() => editor.focus(undefined, { defaultSelection: undefined })}
      trigger={
        <IconButton>
          <FaUserPlus />
        </IconButton>
      }
      disclosure={disclosure}
      input={<Input value={usernameTerm} onChange={e => setUsernameTerm(e.target.value)} />}
      value={usernameTerm}
      onSelect={({ id, username }) => {
        editor.dispatchCommand(INSERT_USER, { id, username });
        setUsernameTerm('');
      }}
    />
  );
}
