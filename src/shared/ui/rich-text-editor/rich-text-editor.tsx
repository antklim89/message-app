import type { ReactNode } from 'react';
import { Box, HStack, Span, Stack, Textarea } from '@chakra-ui/react';
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
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { RICH_TEXT_EDITOR_NAMESPACE } from '@/shared/lib/lexical/constants';
import { EmojiNode } from '@/shared/lib/lexical/nodes/emoji-node';
import { UserNode } from '@/shared/lib/lexical/nodes/user-node';
import { LexicalBodyLengthPlugin } from './plugins/lexical-body-length-plugin';
import { LexicalEmojiPlugin } from './plugins/lexical-emoji-plugin';
import { LexicalFormatButtonsPlugin } from './plugins/lexical-format-buttons-plugin';
import { LexicalKeyDownPlugin } from './plugins/lexical-key-down-plugin';
import { LexicalLinkPlugin } from './plugins/lexical-link-plugin';
import { LexicalUserPlugin } from './plugins/lexical-user-plugin';

export function RichTextEditor({
  maxLength = 600,
  onError = error => console.error(error),
  plugins,
  value,
  placeholder = 'Enter your message...',
  onKeyDown,
  ...props
}: {
  plugins?: ReactNode;
  onError?: (error: Error, editor: LexicalEditor) => void;
  value?: SerializedRootNode;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent | null) => void;
} & Omit<ContentEditableProps, 'placeholder' | 'value' | 'onKeyDown'>) {
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
        nodes: [HashtagNode, UserNode, LinkNode, EmojiNode],
        editorState(editor) {
          try {
            if (value) editor.setEditorState(editor.parseEditorState({ root: value }));
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
        <Stack>
          <HStack mt={2}>
            <LexicalLinkPlugin />
            <LexicalEmojiPlugin />
            {plugins}
            <Box flexGrow={1} />
            <LexicalBodyLengthPlugin maxLength={maxLength} />
          </HStack>
          <HStack mt={2}>
            <LexicalFormatButtonsPlugin />
          </HStack>
        </Stack>
      </Box>

      <LexicalKeyDownPlugin onKeyDown={onKeyDown} />
      <HashtagPlugin />
      <LexicalUserPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin defaultSelection="rootEnd" />
      <LinkPlugin />
    </LexicalComposer>
  );
}
