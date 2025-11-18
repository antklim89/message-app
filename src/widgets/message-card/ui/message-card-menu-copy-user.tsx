import { Box, Menu } from '@chakra-ui/react';
import { copyToClipboard } from '@lexical/clipboard';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { FaCopy } from 'react-icons/fa6';

import { RICH_TEXT_EDITOR_NAMESPACE } from '@/shared/lib/lexical';

export function MessageCardMenuCopyUser(props: { id: string; username: string }) {
  return (
    <LexicalComposer
      initialConfig={{
        onError: () => null,
        namespace: RICH_TEXT_EDITOR_NAMESPACE,
      }}
    >
      <Box h={0} w={0} position="absolute" tabIndex={-1} top={-10000}>
        <ContentEditable />
      </Box>
      <MessageCardMenuCopyUserPlugin {...props} />
    </LexicalComposer>
  );
}
function MessageCardMenuCopyUserPlugin({ id, username }: { id: string; username: string }) {
  const [editor] = useLexicalComposerContext();

  return (
    <Menu.Item
      as="button"
      value="copy-user"
      onClick={async () => {
        await copyToClipboard(editor, null, {
          'text/plain': username,
          'application/x-lexical-editor': JSON.stringify({
            namespace: RICH_TEXT_EDITOR_NAMESPACE,
            nodes: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: username,
                type: 'user',
                version: 1,
                id,
                username,
              },
            ],
          }),
        });
      }}
    >
      <FaCopy /> Copy user
    </Menu.Item>
  );
}
