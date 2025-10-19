import { useEffect, useState } from 'react';
import { IconButton, Input, useDisclosure } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, SELECTION_CHANGE_COMMAND } from 'lexical';
import { FaUserPlus } from 'react-icons/fa6';

import { ProfileSelect } from '@/entities/profiles';
import { $isUserNode, INSERT_USER, useLexicalRectPlugin } from '@/shared/lib/lexical';

export function MessageSelectUserPlugin() {
  const [editor] = useLexicalComposerContext();
  const [usernameTerm, setUsernameTerm] = useState('');
  const position = useLexicalRectPlugin(editor);
  const disclosure = useDisclosure();

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;
        const selectedNode = selection.getNodes()[0];

        if (selection.isCollapsed() && $isUserNode(selectedNode)) setUsernameTerm(selectedNode.getUsername());
        else if (selection.isCollapsed()) setUsernameTerm('');
        else setUsernameTerm(selection.getTextContent());

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

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
