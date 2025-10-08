import { type ComponentProps, type ReactNode, useRef, useState } from 'react';
import { Box, HStack, Stack } from '@chakra-ui/react';
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { MAX_MESSAGE_BODY_LENGTH } from '@/shared/lib/lexical/constants';
import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MessageBodyLengthPlugin } from './lexcical-plugins/message-body-length-plugin';
import { FormatButtonsPlugin } from './lexcical-plugins/message-format-buttons-plugin';
import { MessageLinkPlugin } from './lexcical-plugins/message-link-plugin';
import { MessageSelectUserPlugin } from './lexcical-plugins/message-select-user-plugin';

export const MessageEditForm = ({
  onSubmit,
  value,
  children,
  ...props
}: {
  children?: ReactNode;
  value?: SerializedRootNode;
  onSubmit: (v?: SerializedRootNode) => Promise<void>;
} & Omit<ComponentProps<'form'>, 'onSubmit'>) => {
  const ref = useRef<LexicalEditor>(null);
  const [formIsValid, setFormIsValid] = useState(false);

  return (
    <Box
      asChild
      w="full"
      onSubmit={e => {
        e.preventDefault();
        if (formIsValid) onSubmit(ref.current?.toJSON().editorState.root);
      }}
    >
      <form {...props}>
        <RichTextEditor
          ref={ref}
          value={value}
          plugins={
            <Stack>
              <HStack mt={2}>
                <MessageSelectUserPlugin />
                <MessageLinkPlugin />
                <Box flexGrow={1} />
                <MessageBodyLengthPlugin
                  onLengthChange={length => {
                    setFormIsValid(length <= MAX_MESSAGE_BODY_LENGTH);
                  }}
                  maxLength={MAX_MESSAGE_BODY_LENGTH}
                />
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
