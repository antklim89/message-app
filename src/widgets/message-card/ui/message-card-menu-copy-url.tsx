import { Menu, VisuallyHidden } from '@chakra-ui/react';
import { copyToClipboard } from '@lexical/clipboard';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useRouter } from '@tanstack/react-router';
import { FaCopy } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { RICH_TEXT_EDITOR_NAMESPACE } from '@/shared/lib/lexical';

export function MessageCardMenuCopyUrl({ message }: { message: MessageType }) {
  return (
    <LexicalComposer
      initialConfig={{
        onError: () => null,
        namespace: RICH_TEXT_EDITOR_NAMESPACE,
      }}
    >
      <VisuallyHidden>
        <ContentEditable />
      </VisuallyHidden>
      <MessageCardMenuCopyUrlPlugin message={message} />
    </LexicalComposer>
  );
}
function MessageCardMenuCopyUrlPlugin({ message }: { message: MessageType }) {
  const [editor] = useLexicalComposerContext();
  const { href } = useRouter().buildLocation({ params: { answerId: message.id }, to: '/answers/$answerId' });
  const fullPath = `${location.origin}${href}`;

  async function handleCopy() {
    await copyToClipboard(editor, null, {
      'text/plain': fullPath,
      'application/x-lexical-editor': JSON.stringify({
        namespace: RICH_TEXT_EDITOR_NAMESPACE,
        nodes: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: `message by ${message.author.username}`,
                type: 'text',
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            type: 'link',
            version: 1,
            rel: null,
            target: null,
            title: null,
            url: fullPath,
          },
        ],
      }),
    });
  }

  return (
    <Menu.Item as="button" value="copy-url" onClick={handleCopy}>
      <FaCopy /> Copy url
    </Menu.Item>
  );
}
