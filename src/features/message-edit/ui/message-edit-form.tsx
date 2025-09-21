import { type ComponentProps, type ReactNode, useRef } from 'react';
import { Box, HStack, Stack } from '@chakra-ui/react';
import type { LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';

import { Editor } from '@/shared/ui/editor';
import { FormatButtonsPlugin } from './message-format-buttons-plugin';
import { MessageLinkPlugin } from './message-link-plugin';
import { MessageSelectUserPlugin } from './message-select-user-plugin';

export const MessageEditForm = ({
  onSubmit,
  value,
  children,
  ...props
}: {
  children?: ReactNode;
  value?: SerializedEditorState<SerializedLexicalNode>;
  onSubmit: (v?: SerializedEditorState<SerializedLexicalNode>) => Promise<void>;
} & Omit<ComponentProps<'form'>, 'onSubmit'>) => {
  const ref = useRef<LexicalEditor>(null);

  return (
    <Box
      asChild
      w="full"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(ref.current?.toJSON().editorState);
      }}
    >
      <form {...props}>
        <Editor
          ref={ref}
          value={value}
          plugins={
            <Stack>
              <HStack mt={2}>
                <MessageSelectUserPlugin />
                <MessageLinkPlugin />
              </HStack>
              <HStack mt={2}>
                <FormatButtonsPlugin />
              </HStack>
            </Stack>
          }
        />
        {children}
      </form>
    </Box>
  );
};
