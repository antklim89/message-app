import { type ReactNode, useId } from 'react';
import { Box, HStack, Span, Textarea, useChakraContext } from '@chakra-ui/react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import {
  type Klass,
  type LexicalEditor,
  type LexicalNode,
  type LexicalNodeReplacement,
  type SerializedEditorState,
  type SerializedLexicalNode,
} from 'lexical';

import { RectLexicalPlugin } from '../lib/lexical/plugins/rect-lexical-plugin';

export function Editor({
  namespace,
  onError = error => console.error(error),
  nodes,
  plugins,
  onChange,
  value,
  placeholder = 'Enter your message...',
}: {
  namespace?: string;
  nodes?: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement>;
  plugins?: ReactNode[];
  onError?: (error: Error, editor: LexicalEditor) => void;
  onChange?: (json: SerializedEditorState<SerializedLexicalNode>) => void;
  value?: SerializedEditorState<SerializedLexicalNode>;
  placeholder?: string;
}) {
  const id = useId();
  const theme = useChakraContext();
  return (
    <LexicalComposer
      initialConfig={{
        namespace: namespace ?? id,
        theme: {
          user: theme.css({ color: 'red.500' }),
        },
        onError,
        nodes: [...(nodes ?? [])],
        editorState(editor) {
          if (!value) return null;
          try {
            editor.setEditorState(editor.parseEditorState(value));
            return editor.getEditorState();
          } catch (error) {
            console.error(error);
            return null;
          }
        },
      }}
    >
      <Box w="full" position="relative">
        <PlainTextPlugin
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
        <HStack mt={4}>{plugins}</HStack>
      </Box>

      <RectLexicalPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin defaultSelection="rootEnd" />
      <OnChangePlugin onChange={e => onChange?.(e.toJSON())} />
    </LexicalComposer>
  );
}
