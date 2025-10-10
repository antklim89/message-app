import type { ReactNode } from 'react';
import { Box, Span, Textarea } from '@chakra-ui/react';
import { HashtagNode } from '@lexical/hashtag';
import { LinkNode } from '@lexical/link';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable, type ContentEditableProps } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { $createParagraphNode, $getRoot, type LexicalEditor, type SerializedRootNode } from 'lexical';

import { RICH_TEXT_EDITOR_NAMESPACE } from '../lib/lexical/constants';
import { UserNode } from '../lib/lexical/nodes/user-node';
import { LexicalRectPlugin } from '../lib/lexical/plugins/lexical-rect-plugin';
import { LexicalUserPlugin } from '../lib/lexical/plugins/lexical-user-plugin';

export function RichTextEditor({
  onError = error => console.error(error),
  plugins,
  value,
  placeholder = 'Enter your message...',
  ...props
}: {
  plugins?: ReactNode;
  onError?: (error: Error, editor: LexicalEditor) => void;
  value?: SerializedRootNode;
  placeholder?: string;
} & Omit<ContentEditableProps, 'placeholder' | 'value'>) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: RICH_TEXT_EDITOR_NAMESPACE,
        theme: {
          hashtag: 'editor-hashtag',
          user: 'editor-user',
          text: {
            bold: 'editor-text-bold',
            italic: 'editor-text-italic',
            underline: 'editor-text-underline',
            underlineStrikethrough: 'editor-text-underlineStrikethrough',
            strikethrough: 'editor-text-strikethrough',
          },
          link: 'editor-link',
        },
        onError,
        nodes: [HashtagNode, UserNode, LinkNode],
        editorState(editor) {
          try {
            if (value) editor.setEditorState(editor.parseEditorState({ root: value }));
            else $getRoot().append($createParagraphNode());
          } catch (error) {
            console.error(error);
            return null;
          }
        },
      }}
    >
      <Box w="full" position="relative">
        <RichTextPlugin
          contentEditable={
            <Textarea asChild minH={100} zIndex={1}>
              <ContentEditable
                aria-placeholder={placeholder}
                placeholder={
                  <Span
                    userSelect="none"
                    fontSize="1rem"
                    color="currentcolor/50"
                    top="0.6rem"
                    left="1rem"
                    position="absolute"
                  >
                    {placeholder}
                  </Span>
                }
                {...props}
              />
            </Textarea>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {plugins}
      </Box>

      <HashtagPlugin />
      <LexicalRectPlugin />
      <LexicalUserPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin defaultSelection="rootEnd" />
      <LinkPlugin />
    </LexicalComposer>
  );
}
