import type { ReactNode, RefObject } from 'react';
import { Box, Span, Textarea } from '@chakra-ui/react';
import { HashtagNode } from '@lexical/hashtag';
import { LinkNode } from '@lexical/link';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { $createParagraphNode, $getRoot, type LexicalEditor, type SerializedRootNode } from 'lexical';

import { UserNode } from '../lib/lexical/nodes/user-node';
import { LexicalRectPlugin } from '../lib/lexical/plugins/lexical-rect-plugin';
import { LexicalSelectWordPlugin } from '../lib/lexical/plugins/lexical-select-word-plugin';
import { LexicalUserPlugin } from '../lib/lexical/plugins/lexical-user-plugin';

export const RICH_TEXT_EDITOR_NAMESPACE = 'rich-text-editor';

export function RichTextEditor({
  onError = error => console.error(error),
  plugins,
  value,
  placeholder = 'Enter your message...',
  ref,
}: {
  plugins?: ReactNode;
  onError?: (error: Error, editor: LexicalEditor) => void;
  value?: SerializedRootNode;
  placeholder?: string;
  ref: RefObject<LexicalEditor | null>;
}) {
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
      <LexicalSelectWordPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin defaultSelection="rootEnd" />
      <EditorRefPlugin editorRef={ref} />
      <LinkPlugin />
    </LexicalComposer>
  );
}
