import { useEffect, useRef, useState } from 'react';
import { Button, Input, useDisclosure } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  KEY_DOWN_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { FaUser } from 'react-icons/fa6';

import { ProfileSelect } from '@/entities/profiles';
import { $createUserNode, $isUserNode, UserNode, type UserNodePayload } from '@/shared/lib/lexical/nodes/user-node';
import { RECT_CHANGE_COMMAND } from '@/shared/lib/lexical/plugins/rect-lexical-plugin';

export const INSERT_USER = createCommand<UserNodePayload>();

export function UsernameLexicalPlugin() {
  const [editor] = useLexicalComposerContext();
  const [usernameTerm, setUsernameTerm] = useState('');
  const position = useRef<DOMRect | null>(null);
  const disclosure = useDisclosure();

  useEffect(() => {
    if (!editor.hasNodes([UserNode])) {
      throw new Error('UsernameLexicalPlugin: UserNode not registered on editor (initialConfig.nodes)');
    }

    return editor.registerCommand(
      INSERT_USER,
      payload => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) return false;
        const selectedNode = selection.getNodes()[0];
        if (selection.isCollapsed() && $isUserNode(selectedNode)) {
          selectedNode.replace($createUserNode(payload));
          return false;
        }

        const userNode = $createUserNode(payload);
        selection?.insertNodes([userNode]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;
        const selectedNode = selection.getNodes()[0];
        if (selection.isCollapsed() && $isUserNode(selectedNode)) {
          setUsernameTerm(selectedNode.getUsername());
          return false;
        }
        setUsernameTerm(selection.getTextContent());
        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

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

  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      e => {
        if (e.key === 'e' && e.ctrlKey) {
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
      position={position.current}
      onExitComplete={() => editor.focus(undefined, { defaultSelection: undefined })}
      trigger={
        <Button>
          <FaUser />
        </Button>
      }
      disclosure={disclosure}
      input={<Input value={usernameTerm} onChange={e => setUsernameTerm(e.target.value)} />}
      value={usernameTerm}
      onSelect={({ id, username }) => {
        setUsernameTerm('');
        editor.dispatchCommand(INSERT_USER, { id, username });
      }}
    />
  );
}
